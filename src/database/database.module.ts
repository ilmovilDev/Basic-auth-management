import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Módulo de configuración de la base de datos en NestJS.
 * Utiliza TypeORM y carga la configuración de la base de datos de forma asíncrona.
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            /**
             * Define la configuración de TypeORM de manera asíncrona usando ConfigService.
             * Esto permite acceder a las variables de entorno de manera centralizada.
             */
            useFactory: (configService: ConfigService) => ({
              type: 'postgres', // Define el tipo de base de datos (PostgreSQL en este caso).
              host: configService.getOrThrow<string>('app.dbHost'), // Obtiene el host de la BD.
              port: configService.getOrThrow<number>('app.dbPort'), // Obtiene el puerto de la BD.
              database: configService.getOrThrow<string>('app.dbName'), // Nombre de la BD.
              username: configService.getOrThrow<string>('app.dbUser'), // Usuario de la BD.
              password: configService.getOrThrow<string>('app.dbPassword'), // Contraseña de la BD.
              autoLoadEntities: true, // Carga automáticamente las entidades definidas en el proyecto.
              entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ubicación de las entidades.
              synchronize: true, // Sincroniza el esquema de la BD en tiempo de ejecución (⚠️ No usar en producción).
            }),
            inject: [ConfigService], // Inyecta el servicio de configuración.
        })
    ]
})
export class DatabaseModule {}
