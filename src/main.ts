import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 8007;
  const app = await NestFactory.create(AppModule);

  await app
    .listen(port)
    .then(() =>
      console.log(`Server is running at http://localhost:${port}/graphql`),
    );
}
bootstrap();
