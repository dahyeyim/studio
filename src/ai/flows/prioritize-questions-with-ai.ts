// Prioritize questions based on relevance, sentiment, and frequency.

'use server';

/**
 * @fileOverview AI-powered question prioritization for the seminar app.
 *
 * This file exports:
 * - `prioritizeQuestions` - A function to prioritize questions.
 * - `PrioritizeQuestionsInput` - The input type for `prioritizeQuestions`.
 * - `PrioritizeQuestionsOutput` - The output type for `prioritizeQuestions`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeQuestionsInputSchema = z.object({
  questions: z.array(z.string()).describe('An array of questions to prioritize.'),
  presentationTopic: z.string().describe('The topic of the presentation.'),
});
export type PrioritizeQuestionsInput = z.infer<typeof PrioritizeQuestionsInputSchema>;

const PrioritizeQuestionsOutputSchema = z.array(
  z.object({
    question: z.string().describe('The original question.'),
    priorityScore: z.number().describe('A score indicating the priority of the question.'),
    reason: z.string().describe('Explanation of why the question was prioritized as such.'),
  })
);
export type PrioritizeQuestionsOutput = z.infer<typeof PrioritizeQuestionsOutputSchema>;

export async function prioritizeQuestions(input: PrioritizeQuestionsInput): Promise<PrioritizeQuestionsOutput> {
  return prioritizeQuestionsFlow(input);
}

const prioritizeQuestionsPrompt = ai.definePrompt({
  name: 'prioritizeQuestionsPrompt',
  input: {schema: PrioritizeQuestionsInputSchema},
  output: {schema: PrioritizeQuestionsOutputSchema},
  prompt: `You are a moderator at a seminar. Your task is to prioritize incoming questions from the audience based on their relevance to the presentation topic, the sentiment expressed in the question, and the frequency with which similar questions are asked.

Presentation Topic: {{{presentationTopic}}}

Questions:
{{#each questions}}
- {{{this}}}
{{/each}}

Prioritize the questions, assigning each a priority score and providing a reason for the assigned priority. Higher scores indicate higher priority. Consider relevance, sentiment, and frequency when determining the priority score.

Format your response as a JSON array of objects, where each object has the following keys:
- question: The original question.
- priorityScore: A numerical score indicating the priority of the question (higher is better).
- reason: A brief explanation of why the question was assigned the given priority score.
`,
});

const prioritizeQuestionsFlow = ai.defineFlow(
  {
    name: 'prioritizeQuestionsFlow',
    inputSchema: PrioritizeQuestionsInputSchema,
    outputSchema: PrioritizeQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeQuestionsPrompt(input);
    return output!;
  }
);
