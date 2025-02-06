import { Module } from '@nestjs/common';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

/**
 * Módulo principal de la aplicación en NestJS.
 * Se encarga de importar y configurar los módulos esenciales de la aplicación.
 */
@Module({
  imports: [
    /**
     * ConfigModule:
     * Módulo encargado de la gestión de variables de entorno.
     * Se configura como global (`isGlobal: true`), lo que permite acceder a las variables
     * de configuración en cualquier parte de la aplicación sin necesidad de importar el módulo nuevamente.
     * También carga la configuración desde el archivo `app.config.ts`.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig] // Carga la configuración personalizada de la aplicación.
    }),

    /**
     * FunctionalitiesModule:
     * Módulo que agrupa funcionalidades específicas de la aplicación.
     * Debe contener los controladores, servicios y lógica de negocio necesarios.
     */
    FunctionalitiesModule, 

    /**
     * DatabaseModule:
     * Módulo responsable de la configuración de la base de datos.
     * Administra la conexión con la base de datos utilizando TypeORM.
     */
    DatabaseModule
  ],
  controllers: [], // No se definen controladores en este módulo.
  providers: [], // No se definen proveedores en este módulo.
})
export class AppModule {}
