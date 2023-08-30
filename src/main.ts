import 'dotenv/config';
import path from 'path';
import { HttpStatus, Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
// import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationError } from 'class-validator';
import { flatten } from 'lodash';
import { AppModule } from './app.module';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
import { ApiTransformInterceptor } from './common/interceptors/api-transform.interceptor';
import { setupSwagger } from './setup-swagger';
import { LoggerService } from './shared/logger/logger.service';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });
  app.enableCors();
  app.useStaticAssets({
    root: path.join(__dirname, '/../../public'),
  });
  // 给请求添加prefix
  // app.setGlobalPrefix(PREFIX);
  // custom logger
  app.useLogger(app.get(LoggerService));
  // validate
  app.useGlobalPipes(
    new ValidationPipe({ // 参数校验
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(flatten(errors.filter((item) => !!item.constraints).map((item) => Object.values(item.constraints))).join('; '));
      },
    }),
  );
  // execption
  app.useGlobalFilters(new ApiExceptionFilter(app.get(LoggerService)));
  // api interceptor
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // websocket
  // app.useWebSocketAdapter(new IoAdapter());
  // swagger
  setupSwagger(app);
  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`api服务已经启动,请访问:http://localhost:${PORT}`);
    Logger.log(`API文档已生成,请访问:http://localhost:${PORT}/${process.env.DOCS_PREFIX}/`);
  });
}

bootstrap();
