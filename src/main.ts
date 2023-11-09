import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';
import { config } from 'dotenv';
config()
const server = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.use(cors())
  await app.listen(9001);
}
bootstrap();
