import { Question } from '@/shared/types/Question'

export interface Quiz {
  id: string
  title: string
  createdAt: string
  updatedAt: string

  _count?: {
    questions: number
  }
  questions?: Question[]
}
