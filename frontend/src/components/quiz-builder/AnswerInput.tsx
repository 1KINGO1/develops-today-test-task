import { Control, Controller } from 'react-hook-form'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { FC } from 'react'
import { QuizSchema } from '@/shared/schema/quiz.schema'

interface AnswerInputProps {
  control: Control<QuizSchema>
  questionIndex: number
  answerIndex: number
  questionType: QuestionAnswerType
  onRemove?: () => void
  onBooleanChange?: (isCorrect: boolean) => void
  error?: { text: string }
}

export const AnswerInput: FC<AnswerInputProps> = ({
  control,
  questionIndex,
  answerIndex,
  questionType,
  onRemove,
  onBooleanChange,
  error,
}) => {
  if (questionType === QuestionAnswerType.SHORT_TEXT) {
    return (
      <div className='flex items-center space-x-2'>
        <Controller
          name={`questions.${questionIndex}.answers.${answerIndex}.text`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='text'
              placeholder='Enter the correct answer...'
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error?.text ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
        />
      </div>
    )
  }

  return (
    <div className='flex items-center space-x-2'>
      <Controller
        name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
        control={control}
        render={({ field }) => (
          <input
            type='checkbox'
            checked={field.value}
            onChange={e => {
              if (
                questionType === QuestionAnswerType.BOOLEAN &&
                onBooleanChange
              ) {
                onBooleanChange(e.target.checked)
              } else {
                field.onChange(e.target.checked)
              }
            }}
            className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
          />
        )}
      />
      <Controller
        name={`questions.${questionIndex}.answers.${answerIndex}.text`}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type='text'
            placeholder={`Answer ${answerIndex + 1}...`}
            disabled={questionType === QuestionAnswerType.BOOLEAN}
            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${
              error?.text ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      />
      {questionType === QuestionAnswerType.MULTIPLE_CHOICE && onRemove && (
        <button
          type='button'
          onClick={onRemove}
          className='text-red-500 hover:text-red-700 p-1'
        >
          X
        </button>
      )}
    </div>
  )
}
