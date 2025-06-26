import { isServer } from '@/shared/utils/is-server'

export const URLS = {
  API_BASE_URL:
    (isServer() ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL) ??
    'http://localhost:3000/api/',
  QUIZZES: {
    GET_ALL: 'quizzes',
    GET_ONE: (id: string) => `quizzes/${id}`,
    CREATE: 'quizzes',
    DELETE: (id: string) => `quizzes/${id}`,
  },
} as const
