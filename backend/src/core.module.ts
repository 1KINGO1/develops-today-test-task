import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { QuizzesModule } from './quizzes/quizzes.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PrismaModule, QuizzesModule, ConfigModule.forRoot()],
})
export class CoreModule {}
