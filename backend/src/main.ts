import { NestFactory } from '@nestjs/core'
import { CoreModule } from './core.module'
import { ValidationPipe } from '@nestjs/common'
import * as cors from 'cors'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(CoreModule)
  const configService = app.get(ConfigService)

  app.use(
    cors({
      origin: configService.getOrThrow<string>('ORIGIN'),
    }),
  )
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
