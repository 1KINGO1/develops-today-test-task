import { quizService } from '@/shared/services/quiz.service'
import { notFound } from 'next/navigation'
import { Quiz } from '@/shared/types/Quiz'
import { QuizDetailsPage } from '@/screens/quiz-details/QuizDetailsPage'

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let data: Quiz

  try {
    data = await quizService.getQuizById(id)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return notFound()
  }

  return <QuizDetailsPage quiz={data} />
}
