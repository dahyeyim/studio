'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Clock,
  Download,
  User,
  HelpCircle,
  Dot,
  Loader2,
  PlusCircle,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import {
  useCollection,
  useFirebase,
  useMemoFirebase,
  addDocumentNonBlocking,
  setDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase';
import {
  collection,
  query,
  orderBy,
  doc,
} from 'firebase/firestore';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { Switch } from '@/components/ui/switch';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  presenter: z.string().optional(),
  time: z.string().min(5, 'Time must be in a valid format (e.g., 09:00 - 10:00).'),
  description: z.string().optional(),
  details: z.string().optional(),
  isSession: z.boolean().default(false),
  order: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(0, 'Order must be a positive number.').optional()
  ),
  downloadUrl: z.string().url().optional().or(z.literal('')),
  downloadUrlKorean: z.string().url().optional().or(z.literal('')),
  downloadUrlMongolian: z.string().url().optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

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

export default function SchedulePage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  });

  const handleOpenForm = (item: ScheduleItem | null = null) => {
    setSelectedItem(item);
    if (item) {
      form.reset({
        ...item,
        details: item.details?.join('\n') || '',
      });
    } else {
      const nextOrder = (schedule?.length ?? 0) > 0 ? Math.max(...schedule!.map(s => s.order)) + 1 : 1;
      form.reset({
        title: '',
        presenter: '',
        time: '',
        description: '',
        details: '',
        isSession: false,
        order: nextOrder,
        downloadUrl: '',
        downloadUrlKorean: '',
        downloadUrlMongolian: '',
      });
    }
    setFormOpen(true);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firestore) return;
    setIsSubmitting(true);

    const dataToSave = {
      ...data,
      details: data.details?.split('\n').filter(line => line.trim() !== '') || [],
      order: data.order ?? 0,
    };

    try {
      if (selectedItem) {
        // Update existing item
        const itemRef = doc(firestore, 'schedules', selectedItem.id);
        setDocumentNonBlocking(itemRef, dataToSave, { merge: true });
        toast({ title: 'Success', description: 'Schedule item updated.' });
      } else {
        // Create new item
        const collectionRef = collection(firestore, 'schedules');
        addDocumentNonBlocking(collectionRef, dataToSave);
        toast({ title: 'Success', description: 'Schedule item added.' });
      }
      setFormOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving schedule item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save schedule item.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = (itemId: string) => {
    if (!firestore) return;
    try {
      const itemRef = doc(firestore, 'schedules', itemId);
      deleteDocumentNonBlocking(itemRef);
      toast({ title: 'Success', description: 'Schedule item deleted.' });
    } catch (error) {
       console.error('Error deleting schedule item:', error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete schedule item.',
      });
    }
  };


  const sortedSchedule = useMemo(() => {
    return schedule?.sort((a, b) => a.order - b.order) || [];
  }, [schedule]);

  const isLoading = isLoadingSchedule;

  const specialTitles = ['Regional Development', 'Urban Development'];

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
          <Button onClick={() => handleOpenForm()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </header>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {sortedSchedule.map((item) => {
              const showDownload = !specialTitles.includes(item.title);
              const isKharakhorum = item.title === 'KHARAKHORUM CITY';
              return (
                <Card
                  key={item.id}
                  className={`overflow-hidden relative group ${
                    item.isSession ? 'bg-muted' : 'bg-card-foreground/5'
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenForm(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                              <span className="text-destructive">Delete</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the schedule item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CardHeader>
                    <CardTitle className="font-headline text-xl pr-10">
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
                          <li key={index} className="flex items-start gap-2">
                            <Dot className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  {((showDownload &&
                    (item.downloadUrl ||
                      item.downloadUrlKorean ||
                      item.downloadUrlMongolian)) ||
                    item.isSession ||
                    isKharakhorum) && (
                    <CardFooter className="flex flex-col items-start gap-4">
                      <div className="flex flex-wrap gap-2">
                        {showDownload && item.downloadUrl && (
                          <Button variant="outline" asChild>
                            <a
                              href={item.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </Button>
                        )}
                        {showDownload && item.downloadUrlKorean && (
                          <Button variant="outline" asChild>
                            <a
                              href={item.downloadUrlKorean}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Materials (KR)
                            </a>
                          </Button>
                        )}
                        {showDownload && item.downloadUrlMongolian && (
                          <Button variant="outline" asChild>
                            <a
                              href={item.downloadUrlMongolian}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Materials (MN)
                            </a>
                          </Button>
                        )}
                        {item.isSession && (
                          <Button asChild>
                            <Link
                              href={`/questions?sessionId=${
                                item.id
                              }&topic=${encodeURIComponent(item.title)}`}
                            >
                              <HelpCircle className="mr-2 h-4 w-4" />
                              Go to Q&amp;A
                            </Link>
                          </Button>
                        )}
                      </div>
                      {isKharakhorum && (
                        <div className="flex flex-col items-start gap-4 w-full">
                           <div>
                            <p className="font-semibold text-sm mb-2">Mongolian Presenter</p>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Materials (KR)
                                </a>
                              </Button>
                              <Button variant="outline" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Materials (MN)
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardFooter>
                  )}
                </Card>
              );
            })}
            {sortedSchedule.length === 0 && !isLoading && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No schedule items found.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Schedule Item' : 'Add Schedule Item'}
            </DialogTitle>
            <DialogDescription>
              {selectedItem
                ? 'Update the details of the schedule item.'
                : 'Enter the details for the new schedule item.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1" {...field} />
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
                      <Input placeholder="e.g., Opening Ceremony" {...field} />
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
                      <Input placeholder="e.g., John Doe" {...field} />
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
                      <Input placeholder="e.g., 09:00 - 09:15" {...field} />
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
                      <Textarea placeholder="Brief description of the item." {...field} />
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
                      <Textarea placeholder="- Detail 1&#10;- Detail 2" {...field} />
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
                    <FormLabel>Download URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/download" {...field} />
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
                    <FormLabel>Download URL (Korean)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/download-kr" {...field} />
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
                    <FormLabel>Download URL (Mongolian)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/download-mn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSession"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Is Q&A Session?</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {selectedItem ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
