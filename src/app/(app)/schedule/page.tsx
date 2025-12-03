
'use client';

import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { staticSchedule } from '@/lib/data';
import {
  Clock,
  Download,
  User,
  HelpCircle,
  Dot,
  Loader2,
  PlusCircle,
  Edit,
} from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import {
  collection,
  query,
  orderBy,
  getDocs,
  writeBatch,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

export interface ScheduleItem {
  id: string;
  order: number;
  title: string;
  presenter: string;
  time: string;
  description?: string;
  downloadUrl?: string;
  downloadUrlKorean?: string;
  downloadUrlMongolian?: string;
  isSession: boolean;
  details?: string[];
}

const formSchema = z.object({
  order: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  presenter: z.string().optional(),
  time: z.string().min(1, 'Time is required.'),
  description: z.string().optional(),
  downloadUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  downloadUrlKorean: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  downloadUrlMongolian: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  isSession: z.boolean().default(false),
  details: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SchedulePage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const [isSeeding, setIsSeeding] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);

  const scheduleQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'schedules'), orderBy('order'))
        : null,
    [firestore]
  );
  const { data: schedule, isLoading: isLoadingSchedule } =
    useCollection<ScheduleItem>(scheduleQuery);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order: schedule?.length ? schedule.length + 1 : 1,
      title: '',
      presenter: '',
      time: '',
      description: '',
      downloadUrl: '',
      downloadUrlKorean: '',
      downloadUrlMongolian: '',
      isSession: false,
      details: '',
    },
  });

  useEffect(() => {
    const seedData = async () => {
      if (!firestore || sessionStorage.getItem('scheduleSeeded')) return;

      setIsSeeding(true);
      try {
        const scheduleCollection = collection(firestore, 'schedules');
        const snapshot = await getDocs(scheduleCollection);

        if (snapshot.empty) {
          const batch = writeBatch(firestore);
          staticSchedule.forEach((item) => {
            const docRef = doc(collection(firestore, 'schedules'));
            batch.set(docRef, item);
          });
          await batch.commit();
        }
        sessionStorage.setItem('scheduleSeeded', 'true');
      } catch (error) {
        console.error('Error seeding schedule data:', error);
      } finally {
        setIsSeeding(false);
      }
    };
    seedData();
  }, [firestore]);

  useEffect(() => {
    if (isFormOpen) {
      if (selectedItem) {
        form.reset({
          ...selectedItem,
          details: selectedItem.details?.join('\n'),
        });
      } else {
        form.reset({
          order: (schedule?.length ?? 0) + 1,
          title: '',
          presenter: '',
          time: '',
          description: '',
          downloadUrl: '',
          downloadUrlKorean: '',
          downloadUrlMongolian: '',
          isSession: false,
          details: '',
        });
      }
    }
  }, [isFormOpen, selectedItem, form, schedule]);

  const handleOpenForm = (item: ScheduleItem | null) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firestore) return;

    const processedData = {
      ...data,
      details: data.details ? data.details.split('\n').filter(line => line.trim() !== '') : [],
    };
    
    try {
      if (selectedItem) {
        const docRef = doc(firestore, 'schedules', selectedItem.id);
        await updateDoc(docRef, processedData);
        toast({ title: 'Success', description: 'Schedule item updated.' });
      } else {
        await addDoc(collection(firestore, 'schedules'), processedData);
        toast({ title: 'Success', description: 'Schedule item added.' });
      }
      setFormOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving schedule item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save schedule item.',
      });
    }
  };

  const isLoading = isLoadingSchedule || isSeeding;

  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-semibold tracking-tight">
              Presentation Schedule
            </h1>
            <p className="text-muted-foreground">
              Follow the agenda and download presentation materials.
            </p>
          </div>
          <Button onClick={() => handleOpenForm(null)}>
            <PlusCircle className="mr-2" />
            Add Item
          </Button>
        </header>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {schedule?.map((item) => (
              <Card
                key={item.id}
                className={`overflow-hidden relative group ${
                  item.isSession ? 'bg-muted' : 'bg-card-foreground/5'
                }`}
              >
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    {item.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{item.time}</span>
                    </div>
                    {item.presenter && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{item.presenter}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm text-foreground/80">
                  {item.description && (
                    <p className="mb-4">{item.description}</p>
                  )}
                  {item.details && item.details.length > 0 && (
                    <ul className="space-y-2">
                      {item.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Dot className="h-4 w-4 text-muted-foreground" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                {(item.downloadUrl || item.downloadUrlKorean || item.downloadUrlMongolian || item.isSession) && (
                   <CardFooter className="flex flex-wrap gap-2">
                    {item.downloadUrl && (
                      <Button variant="outline" asChild>
                        <a href={item.downloadUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    )}
                    {item.downloadUrlKorean && (
                      <Button variant="outline" asChild>
                        <a href={item.downloadUrlKorean} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download Materials (KR)
                        </a>
                      </Button>
                    )}
                    {item.downloadUrlMongolian && (
                      <Button variant="outline" asChild>
                        <a href={item.downloadUrlMongolian} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download Materials (MN)
                        </a>
                      </Button>
                    )}
                    {item.isSession && item.id !== 'p4' && item.id !== 'p11' && (
                      <Button asChild>
                        <Link
                          href={`/questions?sessionId=${item.id}&topic=${encodeURIComponent(item.title)}`}
                        >
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Go to Q&amp;A
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                )}
                 <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleOpenForm(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Schedule Item' : 'Add New Schedule Item'}
            </DialogTitle>
            <DialogDescription>
              {selectedItem
                ? 'Update the details for this schedule item.'
                : 'Enter the details for the new schedule item.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="schedule-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-h-[70vh] overflow-y-auto p-1"
            >
               <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="presenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presenter</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details (one per line)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="downloadUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download URL (General)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="downloadUrlKorean"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download URL (KR)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="downloadUrlMongolian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download URL (MN)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="isSession"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is this a Q&A Session?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="schedule-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {selectedItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
