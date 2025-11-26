'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
}

export default function AttendeesPage() {
  const { firestore } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-semibold tracking-tight">
          참석자 명단
        </h1>
        <p className="text-muted-foreground">
          SeminarSync에 등록된 참석자 목록입니다.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>참석자</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="이름으로 검색..."
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
                  <TableHead>이름</TableHead>
                  <TableHead>소속 (기관)</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead>직책</TableHead>
                  <TableHead>이메일</TableHead>
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
                    <TableRow key={attendee.id}>
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
                      참석자가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
