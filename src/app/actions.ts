'use server';

import {
  prioritizeQuestions,
  type PrioritizeQuestionsInput,
  type PrioritizeQuestionsOutput,
} from '@/ai/flows/prioritize-questions-with-ai';

export async function getPrioritizedQuestions(
  data: PrioritizeQuestionsInput
): Promise<{ prioritizedQuestions?: PrioritizeQuestionsOutput; error?: string }> {
  if (data.questions.length === 0) {
    return { error: 'No questions to prioritize.' };
  }

  try {
    const prioritizedQuestions = await prioritizeQuestions(data);
    
    // Sort questions by priority score in descending order
    prioritizedQuestions.sort((a, b) => b.priorityScore - a.priorityScore);

    return { prioritizedQuestions };
  } catch (error) {
    console.error('Error prioritizing questions:', error);
    return { error: 'Failed to prioritize questions. Please try again.' };
  }
}
