import { cn } from '@/shared/utils/cn'

interface RadioInputProps {
  id: string
  isCorrect: boolean
  label: string
  type: 'radio' | 'checkbox'
}

export function SelectInput({ id, isCorrect, label, type }: RadioInputProps) {
  return (
    <div>
      <label className='flex items-center gap-2'>
        <input
          type={type}
          disabled
          checked={isCorrect}
          name={'question-answer-' + id}
          className={cn({
            'form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500':
              true,
            'bg-green-100': isCorrect,
          })}
        />
        {label}
      </label>
    </div>
  )
}
