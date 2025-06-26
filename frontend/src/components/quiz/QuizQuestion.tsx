import { Question } from '@/shared/types/Question'
import { QuizQuestionAnswers } from '@/components/quiz/QuizQuestionAnswers'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'

export function QuizQuestion({
  question,
  answerType,
}: {
  question: Question
  answerType: QuestionAnswerType
}) {
  return (
    <div>
      <p className='text-xl'>
        {question.order}. {question.text}
      </p>
      <div className='mt-3'>
        <QuizQuestionAnswers
          answers={question.answers}
          answerType={answerType}
        />
      </div>
    </div>
  )
}
