import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module";
import { LoggerMiddleware } from "./pino/logger.middleware";

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3002;
  app.useLogger(app.get(Logger));
  app.enableCors();
  // ts-ignore
  await app.listen(port);
}
bootstrap();
