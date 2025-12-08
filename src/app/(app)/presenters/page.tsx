
'use client';

import { useMemo, useState } from 'react';
import {
  Card,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import {
  collection,
  query,
} from 'firebase/firestore';
import Image from 'next/image';

interface Presenter {
  id: string;
  name: string;
  affiliation: string;
  bio?: string;
  imageUrl?: string;
}

const transformGsUrl = (url?: string): string => {
  if (!url) return '';
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
  const { firestore } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPresenter, setSelectedPresenter] = useState<Presenter | null>(
    null
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

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


  const handleOpenDetailsDialog = (presenter: Presenter) => {
    setSelectedPresenter(presenter);
    setDialogOpen(true);
  };


  const isLoading = isLoadingPresenters;

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
        </header>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name..."
              className="w-full rounded-lg bg-background pl-8"
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {filteredPresenters.map((presenter) => {
              if (!presenter) return null;
              const imageUrl = transformGsUrl(presenter.imageUrl);
              return (
                <Card
                  key={presenter.id}
                  className="group overflow-hidden cursor-pointer"
                  onClick={() => handleOpenDetailsDialog(presenter)}
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

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedPresenter(null);
        }
        setDialogOpen(isOpen);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Presenter Details
            </DialogTitle>
            <DialogDescription>
              Information about the presenter.
            </DialogDescription>
          </DialogHeader>
          {selectedPresenter && (
            <div className="space-y-4 py-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
                 {selectedPresenter.imageUrl ? (
                      <Image
                        src={transformGsUrl(selectedPresenter.imageUrl)}
                        alt={`Portrait of ${selectedPresenter.name}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                       <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <span className="text-sm text-muted-foreground">No Image</span>
                      </div>
                    )}
              </div>
               <div>
                  <h4 className="font-semibold text-sm">Name</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPresenter.name}
                  </p>
                </div>
                 <div>
                  <h4 className="font-semibold text-sm">Affiliation</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPresenter.affiliation}
                  </p>
                </div>
              {selectedPresenter.bio && (
                 <div>
                  <h4 className="font-semibold text-sm">Bio</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedPresenter.bio}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
