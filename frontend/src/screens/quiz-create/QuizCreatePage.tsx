import { QuizBuilder } from '@/components/quiz-builder/QuizBuilder'
import Link from 'next/link'

export function QuizCreatePage() {
  return (
    <div>
      <div className='flex items-center justify-center relative'>
        <Link href='/quizzes' className='absolute left-0'>
          ← Go back
        </Link>
        <h1 className='text-3xl text-center'>Create a New Quiz</h1>
      </div>
      <QuizBuilder />
    </div>
  )
}
