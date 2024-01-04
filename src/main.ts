import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/config.service';
import helmet from 'helmet';
import { ProcessEnvEnum } from './config/config.types';
// TODO: Uncomment when ready
// import rateLimit from 'express-rate-limit';
// import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  const env = configService.getEnvVal(ProcessEnvEnum.NODE_ENV) 
  const version = configService.getEnvVal(ProcessEnvEnum.VERSION) 

  // Set global prefix
  app.setGlobalPrefix(version);

  // Enable Cors
  app.enableCors();

  // Use helmet for basic security
  // app.use(helmet());

  // https://github.com/graphql/graphql-playground/issues/1283
  app.use(
    helmet({
      contentSecurityPolicy:
      env ? undefined : false,
    }),
  );

  // Rate Limiting
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  // Enable response compression
  // app.use(compression());

  // Use global validation pipe
  // dependency: npm i class-validator class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Create a logger instance
  const logger = new Logger('Bootstrap');

  // Start the application

  const port = configService.getPort() || 3000;
  await app.listen(port);

  logger.log(
    `\n\n ..:: API Running on: http://localhost:${port}/${version} \n\n`,
  );
}
bootstrap();
