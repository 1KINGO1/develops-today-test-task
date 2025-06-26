export const QuestionAnswerType = {
  SHORT_TEXT: 'SHORT_TEXT',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  BOOLEAN: 'BOOLEAN',
} as const

export type QuestionAnswerType =
  (typeof QuestionAnswerType)[keyof typeof QuestionAnswerType]
