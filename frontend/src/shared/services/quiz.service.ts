import { Quiz } from '@/shared/types/Quiz'
import { URLS } from '@/shared/constants/urls'
import { TAGS } from '@/shared/constants/tags'
import { QuizSchema } from '@/shared/schema/quiz.schema'

class QuizService {
  async getQuizById(quizId: string): Promise<Quiz> {
    const response = await fetch(
      URLS.API_BASE_URL + URLS.QUIZZES.GET_ONE(quizId),
      {
        next: {
          revalidate: 60,
        },
      },
    )
    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data
  }

  async getQuizzes(): Promise<Quiz[]> {
    const response = await fetch(URLS.API_BASE_URL + URLS.QUIZZES.GET_ALL, {
      next: {
        revalidate: 60,
        tags: [TAGS.QUIZZES_LIST],
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data
  }

  async deleteQuiz(quizId: string): Promise<void> {
    const response = await fetch(
      URLS.API_BASE_URL + URLS.QUIZZES.DELETE(quizId),
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      const data = await response.json()
      throw data
    }
  }

  async createQuiz(quizData: QuizSchema): Promise<Quiz> {
    const response = await fetch(URLS.API_BASE_URL + URLS.QUIZZES.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data
  }
}

export const quizService = new QuizService()
