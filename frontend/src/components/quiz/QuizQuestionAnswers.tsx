import { Answer } from '@/shared/types/Answer'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { ShortTextAnswer } from '@/components/quiz/answers/ShortTextAnswer'
import { BooleanAnswers } from '@/components/quiz/answers/BooleanAnswers'
import { MultipleChoiceAnswers } from '@/components/quiz/answers/MultipleChoiceAnswers'

export function QuizQuestionAnswers({
  answers,
  answerType,
}: {
  answers: Answer[]
  answerType: QuestionAnswerType
}) {
  return (
    <div className='mt-3'>
      {answerType === QuestionAnswerType.SHORT_TEXT && (
        <ShortTextAnswer answer={answers[0]} />
      )}
      {answerType === QuestionAnswerType.BOOLEAN && (
        <BooleanAnswers answers={answers} />
      )}
      {answerType === QuestionAnswerType.MULTIPLE_CHOICE && (
        <MultipleChoiceAnswers answers={answers} />
      )}
    </div>
  )
}
