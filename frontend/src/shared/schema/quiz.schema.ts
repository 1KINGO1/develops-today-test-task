import z from 'zod'
import { questionSchema } from '@/shared/schema/question.schema'

export const quizSchema = z.object({
  title: z
    .string()
    .min(3, 'Min title length is 3 characters')
    .max(200, 'Max title length is 200 characters'),
  questions: z
    .array(questionSchema)
    .min(1, 'At least one question is required'),
})

export type QuizSchema = z.infer<typeof quizSchema>
