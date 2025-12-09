'use client';

import { useMemo } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import {
  collection,
  query,
  orderBy,
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

export default function SchedulePage() {
  const { firestore } = useFirebase();

  const scheduleQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'schedules'), orderBy('order'))
        : null,
    [firestore]
  );
  const { data: schedule, isLoading: isLoadingSchedule } =
    useCollection<ScheduleItem>(scheduleQuery);

  const sortedSchedule = useMemo(() => {
    return schedule?.sort((a, b) => a.order - b.order) || [];
  }, [schedule]);

  const isLoading = isLoadingSchedule;

  const specialTitles = ["Regional Development", "Urban Development"];

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
        </header>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {sortedSchedule.map((item) => {
              const showDownload = !specialTitles.includes(item.title);
              return (
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
                        <li key={index} className="flex items-start gap-2">
                          <Dot className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                {((showDownload && (item.downloadUrl || item.downloadUrlKorean || item.downloadUrlMongolian)) || item.isSession) && (
                   <CardFooter className="flex flex-wrap gap-2">
                    {showDownload && item.downloadUrl && (
                      <Button variant="outline" asChild>
                        <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    )}
                    {showDownload && item.downloadUrlKorean && (
                      <Button variant="outline" asChild>
                        <a href={item.downloadUrlKorean} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Materials (KR)
                        </a>
                      </Button>
                    )}
                    {showDownload && item.downloadUrlMongolian && (
                      <Button variant="outline" asChild>
                        <a href={item.downloadUrlMongolian} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Materials (MN)
                        </a>
                      </Button>
                    )}
                    {item.isSession && (
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
              </Card>
            )})}
             {sortedSchedule.length === 0 && !isLoading && (
              <Card>
                <CardContent className="pt-6">
                   <p className="text-center text-muted-foreground">No schedule items found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </>
  );
}
