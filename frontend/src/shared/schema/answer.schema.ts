import { z } from 'zod'

export const answerSchema = z.object({
  text: z
    .string()
    .min(3, 'Answer text must be at least 3 characters')
    .max(100, 'Answer text must not exceed 100 characters'),
  isCorrect: z.boolean(),
})

export type AnswerSchema = z.infer<typeof answerSchema>
