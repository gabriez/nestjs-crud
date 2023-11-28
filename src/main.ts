import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:['http://localhost:3000', 'https://nextjs-crud-6tis5lr9a-gabriez.vercel.app/', "https://nextjs-crud-gabriez.vercel.app/"],
    credentials: true
    });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
