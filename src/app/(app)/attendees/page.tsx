'use client';

import { useMemo, useState } from 'react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Search } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

interface Attendee {
  id: string;
  name: string;
  affiliation: string;
  department: string;
  position: string;
  email: string;
  biography?: string;
}

export default function AttendeesPage() {
  const { firestore } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null
  );

  const attendeesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'attendees')) : null),
    [firestore]
  );
  const { data: attendees, isLoading } = useCollection<Attendee>(attendeesQuery);

  const filteredAttendees = useMemo(() => {
    if (!attendees) return [];
    return attendees.filter((attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [attendees, searchTerm]);

  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <header className="mb-6">
          <h1 className="font-headline text-3xl font-semibold tracking-tight">
            Attendees List
          </h1>
          <p className="text-muted-foreground">
            This is the list of attendees registered in SeminarSync.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Attendees</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Affiliation (Institution)</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : filteredAttendees.length > 0 ? (
                    filteredAttendees.map((attendee) => (
                      <TableRow
                        key={attendee.id}
                        onClick={() => setSelectedAttendee(attendee)}
                        className="cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          {attendee.name}
                        </TableCell>
                        <TableCell>{attendee.affiliation}</TableCell>
                        <TableCell>{attendee.department}</TableCell>
                        <TableCell>{attendee.position}</TableCell>
                        <TableCell>{attendee.email}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No attendees found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!selectedAttendee}
        onOpenChange={(isOpen) => !isOpen && setSelectedAttendee(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedAttendee && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedAttendee.name}
                </DialogTitle>
                <CardDescription>
                  {selectedAttendee.position} at {selectedAttendee.affiliation}
                </CardDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="font-semibold text-sm">Email</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAttendee.email}
                  </p>
                </div>
                {selectedAttendee.biography && (
                  <div>
                    <h4 className="font-semibold text-sm">Biography</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {selectedAttendee.biography}
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
