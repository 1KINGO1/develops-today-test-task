import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { QuestionAnswerType } from '@prisma/client'

@Injectable()
export class QuizzesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllQuizzes() {
    return this.prismaService.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })
  }

  async getQuizById(id: string) {
    const quiz = await this.prismaService.quiz.findUnique({
      where: { id },
      include: {
        _count: {
          select: { questions: true },
        },
        questions: {
          include: {
            answers: true,
          },
        },
      },
    })

    if (!quiz) {
      throw new BadRequestException(`Quiz with id ${id} not found`)
    }

    return quiz
  }

  async createQuiz(dto: CreateQuizDto) {
    const questionsWithAnswers: {
      text: string
      order: number
      answerType: QuestionAnswerType
      answers: {
        create: {
          text: string
          isCorrect: boolean
        }[]
      }
    }[] = []

    for (const questionIndex in dto.questions) {
      const question = dto.questions[questionIndex]

      // Validate consistency of question data
      switch (question.answerType) {
        case QuestionAnswerType.MULTIPLE_CHOICE: {
          const includesCorrectAnswer = question.answers.find(a => a.isCorrect)
          if (!includesCorrectAnswer) {
            throw new BadRequestException(
              'Multiple choice questions must have at least one correct answer',
            )
          }
          break
        }
        case QuestionAnswerType.SHORT_TEXT: {
          if (question.answers.length !== 1 || !question.answers[0].isCorrect) {
            throw new BadRequestException(
              'Short text questions must have only single isCorrect true answer',
            )
          }
          break
        }
        case QuestionAnswerType.BOOLEAN: {
          if (question.answers.length !== 2)
            throw new BadRequestException(
              'Boolean questions must have exactly two answers',
            )

          const trueAnswer = question.answers.find(
            answer => answer.text.toLowerCase() === 'true',
          )
          const falseAnswer = question.answers.find(
            answer => answer.text.toLowerCase() === 'false',
          )

          if (
            !trueAnswer ||
            !falseAnswer ||
            trueAnswer.isCorrect === falseAnswer.isCorrect
          ) {
            throw new BadRequestException(
              'Boolean questions must have only 2 answers with text "True" and "False"',
            )
          }
          break
        }
        default:
          throw new BadRequestException(
            `Unsupported answer type ${question.answerType}`,
          )
      }

      questionsWithAnswers.push({
        text: question.text,
        order: +questionIndex + 1,
        answerType: question.answerType,
        answers: {
          create: question.answers.map(answer => ({
            text: answer.text,
            isCorrect: answer.isCorrect,
          })),
        },
      })
    }

    return this.prismaService.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: questionsWithAnswers,
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    })
  }

  async deleteQuidById(id: string) {
    const quiz = await this.prismaService.quiz.delete({
      where: { id },
    })

    if (!quiz) {
      throw new Error(`Quiz with id ${id} not found`)
    }

    return quiz
  }
}
