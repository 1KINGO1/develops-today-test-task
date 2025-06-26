import { Answer } from '@/shared/types/Answer'
import { SelectInput } from '@/components/quiz/SelectInput'
import { useId } from 'react'

export function MultipleChoiceAnswers({ answers }: { answers: Answer[] }) {
  const id = useId()

  return (
    <div>
      {answers.map(answer => (
        <div key={answer.id} className='flex items-center mb-2'>
          <SelectInput
            type='checkbox'
            id={id}
            label={answer.text}
            isCorrect={answer.isCorrect}
          />
        </div>
      ))}
    </div>
  )
}
