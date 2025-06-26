import { FC } from 'react'

interface ErrorMessageProps {
  message?: string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null

  return <p className='mt-1 text-sm text-red-600'>{message}</p>
}
