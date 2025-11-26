'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth, useFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  affiliation: z.string().min(2, 'Affiliation must be at least 2 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationPage() {
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      affiliation: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!firestore || !user) {
      console.error('Firestore or user not available');
      return;
    }
    setIsSubmitting(true);
    try {
      const attendeesCollection = collection(firestore, 'attendees');
      await addDocumentNonBlocking(attendeesCollection, {
        ...data,
        creatorId: user.uid,
      });
      router.push('/attendees');
    } catch (error) {
      console.error('Error adding attendee: ', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>The 2nd Korea-Mongolia Urban Forum</CardTitle>
          <CardDescription>
            Please enter your name and affiliation to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Firebase University"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
