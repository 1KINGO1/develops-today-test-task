import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { CreateQuizDto } from './dto/create-quiz.dto'

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  getAllQuizzes() {
    return this.quizzesService.getAllQuizzes()
  }

  @Get(':id')
  getQuizById(@Param('id') id: string) {
    return this.quizzesService.getQuizById(id)
  }

  @Post()
  postQuiz(@Body() body: CreateQuizDto) {
    return this.quizzesService.createQuiz(body)
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string) {
    return this.quizzesService.deleteQuidById(id)
  }
}
