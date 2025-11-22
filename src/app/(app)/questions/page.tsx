import { QuestionInterface } from '@/components/question-interface';

export default function QuestionsPage() {
  const presentationTopic = 'The Future of Artificial Intelligence in Business';

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
        <QuestionInterface presentationTopic={presentationTopic} />
      </main>
    </div>
  );
}
