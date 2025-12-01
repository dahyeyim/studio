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
import { collection, query, writeBatch } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { staticPresenters } from '@/lib/data';

interface Presenter {
  id: string;
  name: string;
  affiliation: string;
  imageUrl: string;
  imageHint: string;
  bio: string;
}

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
  
  // This effect will run once to seed the database if it's empty.
  useEffect(() => {
    if (firestore && presenters !== null && presenters.length === 0) {
      const seedDatabase = async () => {
        try {
          const batch = writeBatch(firestore);
          const presentersCollection = collection(firestore, 'presenters');
          
          staticPresenters.forEach(presenter => {
            const docRef = collection(firestore, 'presenters').doc();
            batch.set(docRef, presenter);
          });

          await batch.commit();
          console.log('Presenters collection has been seeded.');
        } catch (error) {
          console.error('Error seeding presenters collection:', error);
        }
      };

      seedDatabase();
    }
  }, [firestore, presenters]);


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
