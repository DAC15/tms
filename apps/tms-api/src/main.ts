import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const globalPrefix = 'api';
  const port = 3000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  /** Setup Swagger */ {
    const config = new DocumentBuilder()
      .setTitle('TMS')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(port);

  Logger.log(
    `🚀 tms-api is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
