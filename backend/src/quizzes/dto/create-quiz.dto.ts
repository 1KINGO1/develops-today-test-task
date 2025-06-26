import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { QuestionAnswerType } from '@prisma/client'

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @Type(() => QuestionDto)
  questions: QuestionDto[]
}

class QuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  text: string

  @IsNotEmpty()
  @IsEnum(QuestionAnswerType)
  answerType: string

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => AnswerDto)
  answers: AnswerDto[]
}

class AnswerDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  text: string

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean
}
