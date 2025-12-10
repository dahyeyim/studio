'use server';

/**
 * @fileOverview AI-powered translation for the seminar app.
 *
 * This file exports:
 * - `translateQuestion` - A function to translate a question between Korean and Mongolian.
 * - `TranslateQuestionInput` - The input type for `translateQuestion`.
 * - `TranslateQuestionOutput` - The output type for `translateQuestion`.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateQuestionInputSchema = z.object({
  question: z.string().describe('The question to translate.'),
});
export type TranslateQuestionInput = z.infer<typeof TranslateQuestionInputSchema>;

const TranslateQuestionOutputSchema = z.object({
  originalLanguage: z
    .enum(['Korean', 'Mongolian', 'Other'])
    .describe('The detected language of the original question.'),
  translatedQuestion: z
    .string()
    .describe(
      'The translated question. Mongolian if original was Korean, and vice versa.'
    ),
});
export type TranslateQuestionOutput = z.infer<typeof TranslateQuestionOutputSchema>;

export async function translateQuestion(
  input: TranslateQuestionInput
): Promise<TranslateQuestionOutput> {
  return translateQuestionFlow(input);
}

const translateQuestionPrompt = ai.definePrompt({
  name: 'translateQuestionPrompt',
  input: { schema: TranslateQuestionInputSchema },
  output: { schema: TranslateQuestionOutputSchema },
  prompt: `You are an expert translator specializing in Korean and Mongolian. Your task is to analyze the following question, determine if it is written in Korean or Mongolian, and then translate it to the other language.

If the question is in Korean, translate it to Mongolian.
If the question is in Mongolian, translate it to Korean.
If the language is neither Korean nor Mongolian, set originalLanguage to 'Other' and return an empty string for the translatedQuestion.

Question:
"{{{question}}}"

Provide your response as a JSON object that adheres to the specified output schema.`,
});

const translateQuestionFlow = ai.defineFlow(
  {
    name: 'translateQuestionFlow',
    inputSchema: TranslateQuestionInputSchema,
    outputSchema: TranslateQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await translateQuestionPrompt(input);
    return output!;
  }
);
