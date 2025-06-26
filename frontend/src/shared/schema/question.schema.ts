import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { answerSchema } from '@/shared/schema/answer.schema'
import z from 'zod'

export const questionSchema = z
  .object({
    text: z
      .string()
      .min(3, 'Question text must be at least 3 characters')
      .max(500, 'Question text must not exceed 500 characters'),
    answerType: z.enum([
      QuestionAnswerType.SHORT_TEXT,
      QuestionAnswerType.MULTIPLE_CHOICE,
      QuestionAnswerType.BOOLEAN,
    ]),
    answers: z.array(answerSchema),
  })
  .refine(data => {
    // Validation for SHORT_TEXT: exactly 1 answer, must be correct
    if (data.answerType === QuestionAnswerType.SHORT_TEXT) {
      return data.answers.length === 1 && data.answers[0].isCorrect === true
    }

    // Validation for BOOLEAN: exactly 2 answers, exactly 1 correct
    if (data.answerType === QuestionAnswerType.BOOLEAN) {
      const correctCount = data.answers.filter(a => a.isCorrect).length
      return data.answers.length === 2 && correctCount === 1
    }

    // Validation for MULTIPLE_CHOICE: 2-10 answers, at least 1 correct
    if (data.answerType === QuestionAnswerType.MULTIPLE_CHOICE) {
      const correctCount = data.answers.filter(a => a.isCorrect).length
      return (
        data.answers.length >= 2 &&
        data.answers.length <= 10 &&
        correctCount >= 1
      )
    }
  }, 'Please at least one correct answer')
