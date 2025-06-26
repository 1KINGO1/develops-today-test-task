import { Quiz } from '@/shared/types/Quiz'
import { QuizQuestion } from '@/components/quiz/QuizQuestion'

export function QuizElement({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <p>Quiz</p>
      <h1 className='font-bold text-3xl'>{quiz.title}</h1>
      <p>
        Questions:{' '}
        {quiz.questions?.length ?? quiz._count?.questions ?? 'Uknown'}
      </p>
      <div className='mt-3 flex flex-col gap-4'>
        {quiz.questions
          ?.sort((a, b) => a.order - b.order)
          .map(question => (
            <QuizQuestion
              question={question}
              key={question.id}
              answerType={question.answerType}
            />
          ))}
      </div>
    </div>
  )
}
