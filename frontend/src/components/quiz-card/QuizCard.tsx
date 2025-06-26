import Link from 'next/link'
import { QuizCardControls } from '@/components/quiz-card/QuizCardControls'

interface QuizCardProps {
  id: string
  title: string
  questionCount: number | string
}

export function QuizCard(props: QuizCardProps) {
  return (
    <div className='flex justify-between items-center bg-gray-800 text-white border border-gray-700 rounded-lg shadow-md p-6 transition hover:shadow-lg;'>
      <div>
        <p className='text-xl'>{props.title}</p>
        <p>Questions: {props.questionCount}</p>
      </div>

      <div className='flex justify-between items-center gap-4'>
        <Link
          href={`/quizzes/${props.id}`}
          className='flex justify-between items-center'
        >
          <p className='text-gray-400 hover:text-gray-100 cursor-pointer'>
            Click to see details
          </p>
        </Link>

        <QuizCardControls id={props.id} />
      </div>
    </div>
  )
}
