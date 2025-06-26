import { Answer } from '@/shared/types/Answer'
import { useId } from 'react'
import { SelectInput } from '@/components/quiz/SelectInput'

export function BooleanAnswers({ answers }: { answers: Answer[] }) {
  const id = useId()

  return (
    <div className='flex gap-4 items-center'>
      {answers.map((answer: Answer) => (
        <SelectInput
          type='radio'
          key={answer.id}
          id={id}
          isCorrect={answer.isCorrect}
          label={answer.text}
        />
      ))}
    </div>
  )
}
