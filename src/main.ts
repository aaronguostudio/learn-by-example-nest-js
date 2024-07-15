import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
