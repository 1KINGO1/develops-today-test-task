import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { Answer } from '@/shared/types/Answer'

export interface Question {
  id: string
  text: string
  order: number
  answerType: QuestionAnswerType

  answers: Answer[]
}
