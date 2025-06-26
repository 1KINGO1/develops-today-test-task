import { FormField } from '@/components/form/FormField'
import { Control, Controller } from 'react-hook-form'
import { FC } from 'react'
import { QuizSchema } from '@/shared/schema/quiz.schema'

interface QuizTitleProps {
  control: Control<QuizSchema>
  error?: string
}

export const QuizTitleInput: FC<QuizTitleProps> = ({ control, error }) => {
  return (
    <FormField label='Quiz Title' error={error}>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type='text'
            placeholder='Enter quiz title...'
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      />
    </FormField>
  )
}
