'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

export function QuizNotFoundPage() {
  const params = useParams<{ id: string }>()

  return (
    <div>
      <h1 className='text-4xl font-bold mb-4'>Quiz not found</h1>
      <p className='text-lg'>
        Quiz ID: <span className='font-mono'>{params?.id}</span>
      </p>
      <Link href='/quizzes' className='pt-10 text-xl block'>
        ← Go back
      </Link>
    </div>
  )
}
