require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AuthGrpcConnect from './grpc/authGrpc';
import { Logger } from '@nestjs/common';
import AllExceptions from './middleware/exceptions';
import ResIntercept from './middleware/res.intercept';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, AuthGrpcConnect);
  app.useGlobalFilters(new AllExceptions())
  app.useGlobalInterceptors(new ResIntercept<any>());
  await app.listen(() => {
    Logger.log('服务启动成功')
  });
}
bootstrap();
