import { Quiz } from '@/shared/types/Quiz'
import { QuizCard } from '@/components/quiz-card/QuizCard'
import Link from 'next/link'

export function QuizzesPage({ quizzes }: { quizzes: Quiz[] }) {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>Quizzes:</h1>
        <Link
          href='/create'
          className='bg-gray-800 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-gray-700 active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition'
        >
          Create
        </Link>
      </div>
      <div className='flex flex-col gap-3 mt-6'>
        {quizzes
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((quiz: Quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionCount={quiz._count?.questions ?? 'Uknown'}
            />
          ))}
      </div>
    </div>
  )
}
