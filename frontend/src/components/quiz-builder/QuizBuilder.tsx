'use client'

import { QuizSchema, quizSchema } from '@/shared/schema/quiz.schema'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuestionAnswerType } from '@/shared/types/QuestionAnswerType'
import { QuizTitleInput } from '@/components/quiz-builder/QuizTitleInput'
import { QuestionCard } from '@/components/quiz-builder/QuestionCard'
import { AnswerSchema } from '@/shared/schema/answer.schema'
import { ActionButtons } from '@/components/quiz-builder/ActionButtons'
import { quizService } from '@/shared/services/quiz.service'
import { useRouter } from 'next/navigation'
import { revalidateQuizzes } from '@/actions/revalidateQuizzes'

export function QuizBuilder() {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuizSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [],
    },
  })
  const router = useRouter()

  const {
    fields: questions,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  })

  const watchedQuestions = watch('questions')

  const handleAddQuestion = () => {
    addQuestion({
      text: '',
      answerType: QuestionAnswerType.MULTIPLE_CHOICE,
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    })
  }

  const handleAnswerTypeChange = (
    questionIndex: number,
    newType: QuestionAnswerType,
  ) => {
    setValue(`questions.${questionIndex}.answerType`, newType)

    if (newType === QuestionAnswerType.SHORT_TEXT) {
      setValue(`questions.${questionIndex}.answers`, [
        { text: '', isCorrect: true },
      ])
    } else if (newType === QuestionAnswerType.BOOLEAN) {
      setValue(`questions.${questionIndex}.answers`, [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: false },
      ])
    } else if (newType === QuestionAnswerType.MULTIPLE_CHOICE) {
      setValue(`questions.${questionIndex}.answers`, [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ])
    }
  }

  const addAnswer = (questionIndex: number) => {
    const currentAnswers = watchedQuestions[questionIndex]?.answers || []
    if (currentAnswers.length < 10) {
      setValue(`questions.${questionIndex}.answers`, [
        ...currentAnswers,
        { text: '', isCorrect: false },
      ])
    }
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentAnswers: AnswerSchema[] =
      watchedQuestions[questionIndex]?.answers || []
    if (currentAnswers.length > 2) {
      const newAnswers = currentAnswers.filter(
        (_, index) => index !== answerIndex,
      )
      setValue(`questions.${questionIndex}.answers`, newAnswers)
    }
  }

  const handleBooleanAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean,
  ) => {
    const currentAnswers = [...(watchedQuestions[questionIndex]?.answers || [])]

    if (isCorrect) {
      currentAnswers.forEach((answer, index) => {
        answer.isCorrect = index === answerIndex
      })
    } else {
      currentAnswers[answerIndex].isCorrect = false
    }

    setValue(`questions.${questionIndex}.answers`, currentAnswers)
  }

  const getErrorMessage = (questionIndex: number) => {
    const questionError = errors.questions?.[questionIndex]
    if (questionError?.message) {
      return questionError.message
    }
    return null
  }

  const onSubmit = (data: QuizSchema) => {
    const result: QuizSchema = {
      title: data.title,
      questions: data.questions.map(q => ({
        text: q.text,
        answerType: q.answerType,
        answers: q.answers.map(a => ({
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      })),
    }

    quizService
      .createQuiz(result)
      .then(async () => {
        await revalidateQuizzes()
        router.push('/quizzes')
      })
      .catch(() => {
        setError('questions', {
          message: 'Failed to create quiz. Please try again.',
        })
      })
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <QuizTitleInput control={control} error={errors.title?.message} />

        <div className='space-y-6'>
          {questions.map((question, questionIndex) => (
            <QuestionCard
              key={question.id}
              control={control}
              questionIndex={questionIndex}
              currentQuestion={watchedQuestions[questionIndex]}
              onRemove={() => removeQuestion(questionIndex)}
              onAnswerTypeChange={newType =>
                handleAnswerTypeChange(questionIndex, newType)
              }
              onAddAnswer={() => addAnswer(questionIndex)}
              onRemoveAnswer={answerIndex =>
                removeAnswer(questionIndex, answerIndex)
              }
              onBooleanAnswerChange={(answerIndex, isCorrect) =>
                handleBooleanAnswerChange(questionIndex, answerIndex, isCorrect)
              }
              error={getErrorMessage(questionIndex)}
              fieldErrors={errors.questions?.[questionIndex]}
            />
          ))}
        </div>

        {errors.questions && typeof errors.questions.message === 'string' && (
          <div className='p-3 border rounded-md text-red-700 text-sm'>
            {errors.questions.message}
          </div>
        )}

        <ActionButtons
          onAddQuestion={handleAddQuestion}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  )
}
