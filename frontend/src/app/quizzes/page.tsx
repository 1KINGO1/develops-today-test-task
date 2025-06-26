import { quizService } from '@/shared/services/quiz.service'
import { QuizzesPage } from '@/screens/quizzes/QuizzesPage'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await quizService.getQuizzes()

  return <QuizzesPage quizzes={data} />
}
