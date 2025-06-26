import Link from 'next/link'
import { QuizElement } from '@/components/quiz/QuizElement'
import { Quiz } from '@/shared/types/Quiz'

export function QuizDetailsPage({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <Link href='/quizzes' className='pb-5 text-xl block'>
        ← Go back
      </Link>
      <QuizElement quiz={quiz} />
    </div>
  )
}
