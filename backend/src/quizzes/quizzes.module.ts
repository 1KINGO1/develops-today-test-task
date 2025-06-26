import { Module } from '@nestjs/common'
import { QuizzesService } from './quizzes.service'
import { QuizzesController } from './quizzes.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
  imports: [PrismaModule],
})
export class QuizzesModule {}
