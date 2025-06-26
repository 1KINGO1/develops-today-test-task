import { ErrorMessage } from '@/components/form/ErrorMessage'
import { ReactNode, FC } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
}

export const FormField: FC<FormFieldProps> = ({ label, error, children }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      {children}
      <ErrorMessage message={error} />
    </div>
  )
}
