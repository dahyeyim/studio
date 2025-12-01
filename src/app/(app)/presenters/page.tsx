'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, getDocs, writeBatch, query } from 'firebase/firestore';
import Image from 'next/image';
import { staticPresenters } from '@/lib/data';

interface Presenter {
  id: string;
  name: string;
  affiliation: string;
  bio?: string;
  imageUrl: string;
  imageHint: string;
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
  const { data: presenters, isLoading: isLoadingPresenters } =
    useCollection<Presenter>(presentersQuery);

  const [isSeeding, setIsSeeding] = useState(true);

  useEffect(() => {
    const seedData = async () => {
      if (!firestore) return;

      // Check if seeding has already been done in this session
      if (sessionStorage.getItem('presentersSeeded')) {
        setIsSeeding(false);
        return;
      }

      const presentersCollection = collection(firestore, 'presenters');
      const snapshot = await getDocs(presentersCollection);

      if (snapshot.empty) {
        console.log('Presenters collection is empty. Seeding data...');
        const batch = writeBatch(firestore);
        staticPresenters.forEach((presenter) => {
          const docRef = collection(firestore, 'presenters');
          // Firestore will auto-generate an ID when using addDoc with a batch
          batch.set(docRef.doc(), presenter);
        });
        await batch.commit();
        console.log('Seeding complete.');
      } else {
        console.log('Presenters collection already has data.');
      }
      
      // Mark seeding as done for this session
      sessionStorage.setItem('presentersSeeded', 'true');
      setIsSeeding(false);
    };

    seedData();
  }, [firestore]);

  const isLoading = isLoadingPresenters || isSeeding;

  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <header className="mb-6">
          <h1 className="font-headline text-3xl font-semibold tracking-tight">
            Presenters
          </h1>
          <p className="text-muted-foreground">
            Meet the speakers of the forum.
          </p>
        </header>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {presenters?.map((presenter) => (
              <Card
                key={presenter.id}
                onClick={() => setSelectedPresenter(presenter)}
                className="group cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={presenter.imageUrl}
                    alt={`Portrait of ${presenter.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={presenter.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="font-semibold text-lg text-primary-foreground">
                      {presenter.name}
                    </h3>
                    <p className="text-sm text-primary-foreground/80">
                      {presenter.affiliation}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={!!selectedPresenter}
        onOpenChange={(isOpen) => !isOpen && setSelectedPresenter(null)}
      >
        <DialogContent className="max-w-sm p-0 sm:max-w-md">
          {selectedPresenter && (
            <>
              <div className="relative aspect-[4/3]">
                <Image
                  src={selectedPresenter.imageUrl}
                  alt={`Portrait of ${selectedPresenter.name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={selectedPresenter.imageHint}
                />
              </div>
              <div className="p-6">
                <DialogHeader className="text-left">
                  <DialogTitle className="text-2xl font-bold">
                    {selectedPresenter.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedPresenter.affiliation}
                  </DialogDescription>
                </DialogHeader>
                {selectedPresenter.bio && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold text-sm">Biography</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {selectedPresenter.bio}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
