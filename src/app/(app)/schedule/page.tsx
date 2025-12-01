
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { presentationSchedule } from '@/lib/data';
import { Clock, Download, User, HelpCircle, Dot } from 'lucide-react';
import Link from 'next/link';

export default function SchedulePage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-semibold tracking-tight">
          Presentation Schedule
        </h1>
        <p className="text-muted-foreground">
          Follow the agenda and download presentation materials.
        </p>
      </header>
      <div className="space-y-6">
        {presentationSchedule.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="bg-card-foreground/5">
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
              {item.description && <p className="mb-4">{item.description}</p>}
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
            {(item.downloadUrls || item.downloadUrl || item.isSession) && (
              <CardFooter className="flex flex-wrap gap-2 bg-card-foreground/5">
                {item.downloadUrl && (
                  <Button variant="outline" asChild>
                    <a href={item.downloadUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                )}
                {item.downloadUrls?.korean && (
                  <Button variant="outline" asChild>
                    <a href={item.downloadUrls.korean} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Materials (KR)
                    </a>
                  </Button>
                )}
                {item.downloadUrls?.mongolian && (
                  <Button variant="outline" asChild>
                    <a href={item.downloadUrls.mongolian} download>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
