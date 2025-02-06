/**
 * Punto de entrada principal de la aplicación NestJS.
 *
 * Este archivo configura y arranca la aplicación, estableciendo la configuración 
 * de CORS, validaciones globales y prefijos para las rutas.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DEFAULT_PORT } from './functionalities/common/constants';
import { corsConfig } from './config/cors.config';

/**
 * Función principal que inicializa la aplicación NestJS.
 * Configura el servidor, habilita CORS, aplica validaciones globales y establece el prefijo de la API.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Determina el puerto de la aplicación, utilizando la variable de entorno o un valor por defecto
  const port = Number(process.env.APP_PORT) ?? DEFAULT_PORT;

  // Configura CORS según la función definida en `cors.config.ts`
  app.enableCors(corsConfig());

  // Establece un prefijo global para todas las rutas de la API
  app.setGlobalPrefix("api/v1.0");

  // Aplica validaciones globales en las solicitudes entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no permitidas
    })
  );

  // Inicia la aplicación en el puerto especificado
  await app.listen(port);
  logger.log(`Aplicación ejecutándose en el puerto: ${port}`);
}

// Ejecuta la función `bootstrap` para iniciar la aplicación
bootstrap();
