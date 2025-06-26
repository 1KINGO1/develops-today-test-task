'use client'
import { MouseEvent } from 'react'
import { quizService } from '@/shared/services/quiz.service'
import { revalidateQuizzes } from '@/actions/revalidateQuizzes'

export function QuizCardControls({ id }: { id: string }) {
  const deleteButtonHandler = (e: MouseEvent) => {
    e.stopPropagation()

    quizService.deleteQuiz(id).then(() => {
      return revalidateQuizzes()
    })
  }

  return (
    <div>
      <button
        onClick={deleteButtonHandler}
        className='bg-red-900 text-white font-medium py-2 px-4 rounded-md shadow-sm transition hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800'
      >
        Delete
      </button>
    </div>
  )
}
