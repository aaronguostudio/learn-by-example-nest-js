import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  // app.useGlobalGuards(new ApiKeyGuard());

  const openAPIOptions = new DocumentBuilder()
    .setTitle("Aaron Guo Demo's API")
    .setDescription("API for Aaron Guo's Demo")
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, openAPIOptions);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
