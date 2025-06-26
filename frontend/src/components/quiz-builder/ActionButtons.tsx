import { FC } from 'react'

interface ActionButtonsProps {
  onAddQuestion: () => void
  isSubmitting?: boolean
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  onAddQuestion,
  isSubmitting,
}) => {
  return (
    <div className='space-y-4'>
      <button
        type='button'
        onClick={onAddQuestion}
        className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <span>Add Question</span>
      </button>

      <div className='pt-6 border-t border-gray-200'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
        </button>
      </div>
    </div>
  )
}
