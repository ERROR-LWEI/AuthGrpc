require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AuthGrpcConnect from './grpc/authGrpc';
import { Logger } from '@nestjs/common';
import AllExceptions from './middleware/exceptions';
import ResIntercept from './middleware/res.intercept';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';


async function initPm2() {
  const pm2file = join(__dirname, '../pm2');
  const pm2Error = join(pm2file, './error');
  const pm2Out = join(pm2file, './out');
  if (!existsSync(pm2file)) {
    await mkdirSync(pm2file);
  }
  if (!existsSync(pm2Error)) {
    await mkdirSync(pm2Error);
  }
  if(!existsSync(pm2Out)) {
    await mkdirSync(pm2Out);
  }
}



async function bootstrap() {
  await initPm2();
  const app = await NestFactory.createMicroservice(AppModule, AuthGrpcConnect);
  app.useGlobalFilters(new AllExceptions())
  app.useGlobalInterceptors(new ResIntercept<any>());
  await app.listen(() => {
    Logger.log('服务启动成功')
  });
}
bootstrap();
