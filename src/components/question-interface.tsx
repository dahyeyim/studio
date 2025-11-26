'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { collection, query } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { getPrioritizedQuestions } from '@/app/actions';
import type { PrioritizeQuestionsOutput } from '@/ai/flows/prioritize-questions-with-ai';
import {
  Loader2,
  Sparkles,
  AlertCircle,
  MessageSquarePlus,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  question: z
    .string()
    .min(10, 'Question must be at least 10 characters long.')
    .max(500, 'Question must be no more than 500 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

interface Question {
  id: string;
  text: string;
  sessionId: string;
  creatorId: string;
}

interface QuestionInterfaceProps {
  presentationTopic: string;
  sessionId: string | null;
}

const initialState: {
  prioritizedQuestions?: PrioritizeQuestionsOutput;
  error?: string;
} = {};

function PrioritizeButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant="outline">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4 text-accent" />
      )}
      Prioritize with AI
    </Button>
  );
}

export function QuestionInterface({
  presentationTopic,
  sessionId,
}: QuestionInterfaceProps) {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [localQuestions, setLocalQuestions] = useState<string[]>([]);

  const questionsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'questions')) : null),
    [firestore]
  );
  const { data: allQuestions, isLoading: isLoadingQuestions } =
    useCollection<Question>(questionsQuery);

  const [state, formAction] = useFormState(
    getPrioritizedQuestions,
    initialState
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be signed in to submit a question.',
      });
      return;
    }
    if (!sessionId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Cannot submit a question without a session.',
      });
      return;
    }

    const questionData = {
      text: data.question,
      creatorId: user.uid,
      sessionId: sessionId,
    };

    addDocumentNonBlocking(collection(firestore, 'questions'), questionData);
    setLocalQuestions((prev) => [...prev, data.question]);
    form.reset();
    toast({
      title: 'Question Submitted',
      description: 'Your question has been added to the list.',
    });
  };

  const getPriorityBadgeVariant = (score: number) => {
    if (score >= 8) return 'destructive';
    if (score >= 5) return 'default';
    return 'secondary';
  };

  const questionsForAI = useMemo(() => {
    const combined = new Set([
      ...localQuestions,
      ...(allQuestions?.map((q) => q.text) || []),
    ]);
    return Array.from(combined);
  }, [localQuestions, allQuestions]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>For: {presentationTopic}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="question-input">
                        Your Question
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="question-input"
                          placeholder="Type your question here..."
                          {...field}
                          disabled={!sessionId || isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={!sessionId || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                  )}
                  Submit Question
                </Button>
                {!sessionId && (
                  <p className="text-sm text-destructive">
                    Please select a session from the schedule to ask a question.
                  </p>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Questions</CardTitle>
            <CardDescription>
              {questionsForAI.length > 0
                ? 'Here are the questions from the audience.'
                : 'No questions have been submitted yet.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingQuestions ? (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : questionsForAI.length > 0 ? (
              <ul className="space-y-3">
                {questionsForAI.map((q, i) => (
                  <li
                    key={i}
                    className="rounded-md border bg-secondary/50 p-3 text-sm"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>AI Prioritized Questions</CardTitle>
                <CardDescription>
                  AI-sorted questions based on relevance and urgency.
                </CardDescription>
              </div>
              <form
                action={() =>
                  formAction({ questions: questionsForAI, presentationTopic })
                }
              >
                <PrioritizeButton />
              </form>
            </div>
          </CardHeader>
          <CardContent>
            {state?.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            {state?.prioritizedQuestions && (
              <Accordion type="single" collapsible className="w-full">
                {state.prioritizedQuestions.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start gap-4">
                        <Badge
                          variant={getPriorityBadgeVariant(item.priorityScore)}
                          className="mt-1"
                        >
                          {item.priorityScore}
                        </Badge>
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-12 text-muted-foreground">
                      <strong>Reason:</strong> {item.reason}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            {!state?.prioritizedQuestions && !state?.error && (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  Prioritize Questions
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click the &quot;Prioritize with AI&quot; button to sort
                  submitted questions.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
