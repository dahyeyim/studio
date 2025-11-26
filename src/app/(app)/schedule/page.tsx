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
import { Clock, Download, User, HelpCircle } from 'lucide-react';
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
                  <User className="h-4 w-4" />
                  <span>{item.presenter}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{item.time}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm text-foreground/80">
              <p>{item.description}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 bg-card-foreground/5">
              {item.downloadUrl && (
                <Button variant="outline" asChild>
                  <a href={item.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Materials
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
          </Card>
        ))}
      </div>
    </div>
  );
}
