'use client';

import { Suspense } from 'react';
import { QuestionInterface } from '@/components/question-interface';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function QuestionPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const topic = searchParams.get('topic');

  const presentationTopic = topic || 'General Q&A';

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-semibold tracking-tight">
          Live Q&A
        </h1>
        <p className="text-muted-foreground">
          Submit your questions for the speaker.
        </p>
      </header>
      <main>
        <QuestionInterface
          presentationTopic={presentationTopic}
          sessionId={sessionId}
        />
      </main>
    </div>
  );
}

export default function QuestionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <QuestionPageContent />
    </Suspense>
  );
}
