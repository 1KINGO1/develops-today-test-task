import { FormField } from '@/components/form/FormField'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { Control, Controller } from 'react-hook-form'
import { FC } from 'react'
import { QuizSchema } from '@/shared/schema/quiz.schema'

interface QuestionTypeSelectorProps {
  control: Control<QuizSchema>
  questionIndex: number
  onTypeChange: (newType: QuestionAnswerType) => void
}

export const QuestionTypeSelector: FC<QuestionTypeSelectorProps> = ({
  control,
  questionIndex,
  onTypeChange,
}) => {
  return (
    <FormField label='Answer Type'>
      <Controller
        name={`questions.${questionIndex}.answerType`}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            onChange={e => onTypeChange(e.target.value as QuestionAnswerType)}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value={QuestionAnswerType.MULTIPLE_CHOICE}>
              Multiple Choice
            </option>
            <option value={QuestionAnswerType.SHORT_TEXT}>Short Text</option>
            <option value={QuestionAnswerType.BOOLEAN}>True/False</option>
          </select>
        )}
      />
    </FormField>
  )
}
