import { FormField } from '../form/FormField'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { AnswerInput } from '@/components/quiz-builder/AnswerInput'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import { QuizSchema } from '@/shared/schema/quiz.schema'
import { AnswerSchema } from '@/shared/schema/answer.schema'

interface AnswerListProps {
  control: Control<QuizSchema>
  questionIndex: number
  questionType: QuestionAnswerType
  answers: AnswerSchema[]
  onAddAnswer: () => void
  onRemoveAnswer: (answerIndex: number) => void
  onBooleanAnswerChange: (answerIndex: number, isCorrect: boolean) => void
  errors?: { text: string }[]
}

export const AnswerList: FC<AnswerListProps> = ({
  control,
  questionIndex,
  questionType,
  answers,
  onAddAnswer,
  onRemoveAnswer,
  onBooleanAnswerChange,
  errors,
}) => {
  return (
    <FormField label='Answers'>
      <div className='space-y-2'>
        {answers?.map((answer, answerIndex) => (
          <AnswerInput
            key={answerIndex}
            control={control}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
            questionType={questionType}
            onRemove={
              questionType === QuestionAnswerType.MULTIPLE_CHOICE &&
              answers.length > 2
                ? () => onRemoveAnswer(answerIndex)
                : undefined
            }
            onBooleanChange={
              questionType === QuestionAnswerType.BOOLEAN
                ? isCorrect => onBooleanAnswerChange(answerIndex, isCorrect)
                : undefined
            }
            error={errors?.[answerIndex]}
          />
        ))}

        {questionType === QuestionAnswerType.MULTIPLE_CHOICE &&
          answers.length < 10 && (
            <button
              type='button'
              onClick={onAddAnswer}
              className='flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm'
            >
              <span>Add Answer</span>
            </button>
          )}
      </div>
    </FormField>
  )
}
