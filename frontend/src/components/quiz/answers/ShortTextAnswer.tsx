import { Answer } from '@/shared/types/Answer'

export function ShortTextAnswer({ answer }: { answer: Answer }) {
  return (
    <div>
      <input type='text' className='w-full' disabled value={answer.text} />
    </div>
  )
}
