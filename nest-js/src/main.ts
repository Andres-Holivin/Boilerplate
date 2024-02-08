import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { IEnvironment } from './utils/environment';
import { ErrorHandler, RequestHandler, ResponseHandler } from './utils/handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<IEnvironment>);
  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  if (configService.getOrThrow('app.env', { infer: true }) === 'development') {
    SwaggerModule.setup('docs', app, document);
  }
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RequestHandler(), new ResponseHandler());
  app.useGlobalFilters(new ErrorHandler());
  await app.listen(
    configService.getOrThrow('app.port', { infer: true }),
    () => {
      console.log(
        `Server is running on ${configService.getOrThrow('app.port', {
          infer: true,
        })} port`,
      );
    },
  );
}
void bootstrap();
