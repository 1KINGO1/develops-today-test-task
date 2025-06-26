import { QuestionTypeSelector } from '@/components/quiz-builder/QuestionTypeSelection'
import { AnswerList } from '@/components/quiz-builder/AnswerList'
import { FormField } from '@/components/form/FormField'
import { Control, Controller } from 'react-hook-form'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { FC } from 'react'
import { QuizSchema } from '@/shared/schema/quiz.schema'
import { AnswerSchema } from '@/shared/schema/answer.schema'

interface QuestionCardProps {
  control: Control<QuizSchema>
  questionIndex: number
  currentQuestion: { answers: AnswerSchema[]; answerType: QuestionAnswerType }
  onRemove: () => void
  onAnswerTypeChange: (newType: QuestionAnswerType) => void
  onAddAnswer: () => void
  onRemoveAnswer: (answerIndex: number) => void
  onBooleanAnswerChange: (answerIndex: number, isCorrect: boolean) => void
  error?: string | null
  /* eslint-disable @typescript-eslint/no-explicit-any */
  fieldErrors?: any
}

export const QuestionCard: FC<QuestionCardProps> = ({
  control,
  questionIndex,
  currentQuestion,
  onRemove,
  onAnswerTypeChange,
  onAddAnswer,
  onRemoveAnswer,
  onBooleanAnswerChange,
  error,
  fieldErrors,
}) => {
  return (
    <div className='rounded-lg p-6'>
      <div className='flex justify-between items-start mb-4'>
        <h3 className='text-lg font-semibold'>Question {questionIndex + 1}</h3>
        <button
          type='button'
          onClick={onRemove}
          className='text-red-500 hover:text-red-700 p-1'
        >
          Delete
        </button>
      </div>

      {error && (
        <div className='mb-4 rounded-md text-red-700 text-sm'>{error}</div>
      )}

      <FormField label='Question Text' error={fieldErrors?.text?.message}>
        <Controller
          name={`questions.${questionIndex}.text`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type='text'
              placeholder='Enter your question...'
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors?.text ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
        />
      </FormField>

      <QuestionTypeSelector
        control={control}
        questionIndex={questionIndex}
        onTypeChange={onAnswerTypeChange}
      />

      <AnswerList
        control={control}
        questionIndex={questionIndex}
        questionType={currentQuestion?.answerType}
        answers={currentQuestion?.answers || []}
        onAddAnswer={onAddAnswer}
        onRemoveAnswer={onRemoveAnswer}
        onBooleanAnswerChange={onBooleanAnswerChange}
        errors={fieldErrors?.answers}
      />
    </div>
  )
}
