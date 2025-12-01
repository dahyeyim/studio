'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, getDocs, writeBatch, doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

interface Presenter {
  id: string;
  name: string;
  affiliation: string;
  imageUrl: string;
  imageHint: string;
  bio: string;
}

const staticPresenters: Omit<Presenter, 'id'>[] = [
  {
    name: 'B.Ariunjargalan',
    affiliation: 'National Institute for Regional and Urban Development',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2Mzc0NTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman portrait',
    bio: 'B. Ariunjargalan is a leading researcher at the National Institute for Regional and Urban Development, specializing in sustainable urban planning and infrastructure. With over 15 years of experience, she has been instrumental in shaping policies for smart city development in Mongolia. Her work focuses on integrating green technologies and community-centric designs into modern urban environments.',
  },
  {
    name: 'Kim Min-jun',
    affiliation: 'Seoul Metropolitan Government',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjM4MDkyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'man portrait',
    bio: 'Kim Min-jun is a senior urban planner for the Seoul Metropolitan Government. He has led numerous successful urban regeneration projects, transforming old industrial areas into vibrant cultural hubs. His expertise lies in public-private partnerships and the implementation of technology-driven solutions to improve city life. He is a strong advocate for data-informed policy making.',
  },
];


export default function PresentersPage() {
  const { firestore } = useFirebase();
  const [selectedPresenter, setSelectedPresenter] = useState<Presenter | null>(
    null
  );

  const presentersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'presenters')) : null),
    [firestore]
  );
  const { data: presenters, isLoading } = useCollection<Presenter>(presentersQuery);

  useEffect(() => {
    if (!firestore) return;

    const seedData = async () => {
       // This check prevents the seeding from running more than once per session.
      if (sessionStorage.getItem('presenters_seeded')) {
        return;
      }
      
      const presentersCollection = collection(firestore, 'presenters');
      const snapshot = await getDocs(presentersCollection);
      
      const batch = writeBatch(firestore);

      // Delete all existing documents
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Add the two new presenters
      staticPresenters.forEach((presenter) => {
        const newDocRef = doc(presentersCollection); // Create a new doc with auto-generated ID
        batch.set(newDocRef, presenter);
      });

      await batch.commit();
      sessionStorage.setItem('presenters_seeded', 'true');
    };

    seedData();
  }, [firestore]);


  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <header className="mb-6">
          <h1 className="font-headline text-3xl font-semibold tracking-tight">
            Forum Presenters
          </h1>
          <p className="text-muted-foreground">
            Meet the experts speaking at the forum.
          </p>
        </header>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {presenters?.map((presenter) => (
              <Card
                key={presenter.id}
                className="cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedPresenter(presenter)}
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={presenter.imageUrl}
                      alt={`Portrait of ${presenter.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={presenter.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{presenter.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {presenter.affiliation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={!!selectedPresenter}
        onOpenChange={(isOpen) => !isOpen && setSelectedPresenter(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          {selectedPresenter && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedPresenter.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground pt-1">
                  {selectedPresenter.affiliation}
                </p>
              </DialogHeader>
              <div className="grid gap-6 py-4 md:grid-cols-3">
                <div className="relative col-span-1 aspect-square w-full self-start overflow-hidden rounded-md md:aspect-[3/4]">
                  <Image
                    src={selectedPresenter.imageUrl}
                    alt={`Portrait of ${selectedPresenter.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={selectedPresenter.imageHint}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <h4 className="font-semibold mb-2">Biography</h4>
                  <p className="text-sm text-foreground/80 whitespace-pre-line">
                    {selectedPresenter.bio}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
