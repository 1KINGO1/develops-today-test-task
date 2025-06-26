'use server'

import { revalidateTag } from 'next/cache'
import { TAGS } from '@/shared/constants/tags'

export async function revalidateQuizzes() {
  revalidateTag(TAGS.QUIZZES_LIST)
}
