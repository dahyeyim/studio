
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, Search } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import {
  collection,
  getDocs,
  writeBatch,
  query,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import { staticPresenters } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface Presenter {
  id: string;
  name: string;
  affiliation: string;
  bio?: string;
  imageUrl?: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  affiliation: z.string().min(2, 'Affiliation must be at least 2 characters.'),
  imageUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  bio: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const transformGsUrl = (url?: string): string | undefined => {
  if (url && url.startsWith('gs://')) {
    const bucketAndPath = url.substring(5);
    const [bucket, ...pathParts] = bucketAndPath.split('/');
    const path = pathParts.join('/');
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      path
    )}?alt=media`;
  }
  return url;
};

export default function PresentersPage() {
  const { firestore, user } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPresenter, setSelectedPresenter] = useState<Presenter | null>(
    null
  );
  const [isSeeding, setIsSeeding] = useState(false);
  const [isAddPresenterOpen, setAddPresenterOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      affiliation: '',
      imageUrl: '',
      bio: '',
    },
  });

  const presentersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'presenters')) : null),
    [firestore]
  );
  const { data: presenters, isLoading: isLoadingPresenters } =
    useCollection<Presenter>(presentersQuery);

  const filteredPresenters = useMemo(() => {
    if (!presenters) return [];
    return presenters.filter((presenter) =>
      presenter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [presenters, searchTerm]);


  useEffect(() => {
    const seedData = async () => {
      if (!firestore) return;

      if (sessionStorage.getItem('presentersSeeded')) {
        setIsSeeding(false);
        return;
      }

      setIsSeeding(true);
      try {
        const presentersCollection = collection(firestore, 'presenters');
        const snapshot = await getDocs(presentersCollection);

        if (snapshot.empty) {
          const addBatch = writeBatch(firestore);
          staticPresenters.forEach((presenter) => {
            const docRef = doc(collection(firestore, 'presenters'));
            addBatch.set(docRef, presenter);
          });
          await addBatch.commit();
        }

        sessionStorage.setItem('presentersSeeded', 'true');
      } catch (error) {
        console.error('Error seeding presenters data:', error);
      } finally {
        setIsSeeding(false);
      }
    };

    seedData();
  }, [firestore]);

  useEffect(() => {
    if (selectedPresenter) {
      form.reset(selectedPresenter);
    } else {
      form.reset({
        name: '',
        affiliation: '',
        imageUrl: '',
        bio: '',
      });
    }
  }, [selectedPresenter, form]);

  const handleOpenAddDialog = () => {
    setSelectedPresenter(null);
    form.reset({ name: '', affiliation: '', imageUrl: '', bio: '' });
    setAddPresenterOpen(true);
  };

  const handleOpenEditDialog = (presenter: Presenter) => {
    setSelectedPresenter(presenter);
    setAddPresenterOpen(true);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be signed in to add or edit a presenter.',
      });
      return;
    }

    const processedData = { ...data, imageUrl: transformGsUrl(data.imageUrl) };

    try {
      if (selectedPresenter) {
        // Update existing presenter
        const presenterDocRef = doc(
          firestore,
          'presenters',
          selectedPresenter.id
        );
        await updateDoc(presenterDocRef, processedData);
        toast({
          title: 'Presenter Updated',
          description: `${processedData.name}'s information has been updated.`,
        });
      } else {
        // Add new presenter
        const presentersCollection = collection(firestore, 'presenters');
        await addDoc(presentersCollection, processedData);
        toast({
          title: 'Presenter Added',
          description: `${processedData.name} has been added to the list.`,
        });
      }
      form.reset();
      setAddPresenterOpen(false);
      setSelectedPresenter(null);
    } catch (error) {
      console.error('Error saving presenter: ', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  const isLoading = isLoadingPresenters || isSeeding;

  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-semibold tracking-tight">
              Presenters
            </h1>
            <p className="text-muted-foreground">
              Meet the speakers of the forum.
            </p>
          </div>
          <Button onClick={handleOpenAddDialog}>
            <PlusCircle className="mr-2" />
            Add Presenter
          </Button>
        </header>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name..."
              className="w-full rounded-lg bg-background pl-8 md:w-[280px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPresenters.map((presenter) => {
              if (!presenter) return null;
              const imageUrl = transformGsUrl(presenter.imageUrl);
              return (
                <Card
                  key={presenter.id}
                  onClick={() => handleOpenEditDialog(presenter)}
                  className="group cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`Portrait of ${presenter.name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                       <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <span className="text-sm text-muted-foreground">No Image</span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{presenter.name}</CardTitle>
                    <CardDescription>{presenter.affiliation}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
             {filteredPresenters.length === 0 && !isLoading && (
              <div className="col-span-full text-center text-muted-foreground py-10">
                No presenters found.
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={isAddPresenterOpen} onOpenChange={setAddPresenterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedPresenter ? 'Edit Presenter' : 'Add a New Presenter'}
            </DialogTitle>
            <DialogDescription>
              {selectedPresenter
                ? 'Update the details for the presenter.'
                : 'Enter the details for the new presenter.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="presenter-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Firebase University"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short bio about the presenter."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddPresenterOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="presenter-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {selectedPresenter ? 'Save Changes' : 'Save Presenter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
