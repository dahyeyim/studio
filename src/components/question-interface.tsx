'use client';

import { useState, useMemo } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { collection, query, where, getDocs, orderBy, doc } from 'firebase/firestore';

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
  Trash2,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useCollection, useFirebase, useMemoFirebase, deleteDocumentNonBlocking } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import type { ScheduleItem } from '@/app/(app)/schedule/page';


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
  attendeeName: string;
  attendeeAffiliation: string;
}

interface Attendee {
  id: string;
  name: string;
  affiliation: string;
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
  // This is a placeholder, in a real app, you'd get this from a config or user roles
  const ADMIN_UID = "8hLtc9h4YdSTNfWiUvGgTFEg0U32";

  const questionsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'questions')) : null),
    [firestore]
  );
  const { data: allQuestions, isLoading: isLoadingQuestions } =
    useCollection<Question>(questionsQuery);
    
  const scheduleQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'schedules'), orderBy('order')) : null),
    [firestore]
  );
  const { data: schedule } = useCollection<ScheduleItem>(scheduleQuery);

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

    try {
      const attendeesQuery = query(
        collection(firestore, 'attendees'),
        where('creatorId', '==', user.uid)
      );
      const attendeeSnapshot = await getDocs(attendeesQuery);

      let attendeeName = 'Anonymous';
      let attendeeAffiliation = 'N/A';

      if (!attendeeSnapshot.empty) {
        const attendeeData = attendeeSnapshot.docs[0].data() as Attendee;
        attendeeName = attendeeData.name;
        attendeeAffiliation = attendeeData.affiliation;
      }

      const questionData = {
        text: data.question,
        creatorId: user.uid,
        sessionId: sessionId,
        attendeeName,
        attendeeAffiliation,
      };

      addDocumentNonBlocking(collection(firestore, 'questions'), questionData);
      form.reset();
      toast({
        title: 'Question Submitted',
        description: 'Your question has been added to the list.',
      });
    } catch (error) {
       console.error("Error submitting question: ", error);
       toast({
         variant: "destructive",
         title: "Submission Failed",
         description: "Could not fetch attendee details. Please try again.",
       });
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!firestore) return;
    try {
      const questionRef = doc(firestore, 'questions', questionId);
      deleteDocumentNonBlocking(questionRef);
      toast({
        title: 'Question Deleted',
        description: 'The question has been removed.',
      });
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: 'Could not delete the question. Please try again.',
      });
    }
  };

  const getPriorityBadgeVariant = (score: number) => {
    if (score >= 8) return 'destructive';
    if (score >= 5) return 'default';
    return 'secondary';
  };

  const questionsForAI = useMemo(() => {
    return allQuestions?.map((q) => q.text) || [];
  }, [allQuestions]);

  const getSessionTopic = (sessionId: string) => {
    const session = schedule?.find((s) => s.id === sessionId);
    return session ? session.title : 'Unknown Session';
  };
  
  const questionsBySession = useMemo(() => {
    if (!allQuestions) return {};
    return allQuestions.reduce((acc, q) => {
      (acc[q.sessionId] = acc[q.sessionId] || []).push(q);
      return acc;
    }, {} as Record<string, Question[]>);
  }, [allQuestions]);

  const sortedSessionIds = useMemo(() => {
    if (!schedule) return [];
    const sessionIdsFromQuestions = Object.keys(questionsBySession);
    return schedule
      .map(s => s.id)
      .filter(id => sessionIdsFromQuestions.includes(id));
  }, [questionsBySession, schedule]);


  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        {sessionId && (
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
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <CardHeader className="p-0">
              <CardTitle>Submitted Questions</CardTitle>
              <CardDescription>
                {allQuestions && allQuestions.length > 0
                  ? 'Here are the questions from the audience.'
                  : 'No questions have been submitted yet.'}
              </CardDescription>
            </CardHeader>
          {isLoadingQuestions ? (
            <div className="flex justify-center pt-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : sortedSessionIds.length > 0 ? (
             sortedSessionIds.map((sessionId) => (
              <Card key={sessionId}>
                <CardHeader>
                  <CardTitle className="text-lg">{getSessionTopic(sessionId)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {questionsBySession[sessionId].map((q) => {
                      const canDelete = user && (user.uid === q.creatorId || user.uid === ADMIN_UID);
                      return (
                      <li
                        key={q.id}
                        className="rounded-md border bg-secondary/50 p-3 relative group"
                      >
                        <p className="text-sm pr-8">{q.text}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          From: {q.attendeeName} ({q.attendeeAffiliation})
                        </p>
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100"
                            onClick={() => handleDeleteQuestion(q.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete question</span>
                          </Button>
                        )}
                      </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))
          ) : (
             !sessionId && (
              <Card>
                <CardContent className="pt-6">
                   <p className="text-center text-muted-foreground">No questions submitted yet.</p>
                </CardContent>
              </Card>
             )
          )}
        </div>
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
