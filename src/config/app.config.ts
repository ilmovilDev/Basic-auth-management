import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

/**
 * Interfaz que define la estructura de la configuración de la aplicación.
 */
type AppConfig = {
  appPort: number;  // Puerto en el que se ejecutará la aplicación

  // Configuración de la base de datos
  dbPort: number;    // Puerto de la base de datos
  dbHost: string;    // Host de la base de datos
  dbName: string;    // Nombre de la base de datos
  dbUser: string;    // Usuario de la base de datos
  dbPassword: string; // Contraseña de la base de datos

  // Configuración de Bcrypt
  bcryptSaltRounds: number; // Número de rondas de hash para encriptación con bcrypt

  // Configuración de JWT
  jwtSecret: string;      // Clave secreta para JWT
  jwtExpiration: string;  // Tiempo de expiración del token JWT
};

/**
 * Exporta la configuración de la aplicación utilizando `registerAs` de NestJS.
 * Esta configuración permite acceder a las variables de entorno de forma tipada y validada.
 */
export default registerAs('app', (): AppConfig => {

  /**
   * Función auxiliar para obtener y validar variables de entorno.
   * @param key - Clave de la variable de entorno.
   * @param defaultValue - Valor predeterminado opcional.
   * @returns El valor de la variable de entorno convertida al tipo esperado.
   * @throws Lanza una excepción si la variable es obligatoria y no está definida.
   */
  const getEnv = <T>(key: string, defaultValue?: T): T => {
    const value = process.env[key];
    if (value === undefined || value === null) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new InternalServerErrorException(`Falta la variable de entorno requerida: ${key}. Por favor, verifique sua configuração.`);
    }
    return value as T;
  };

  return {
    // Configuración de la aplicación
    appPort: Number(getEnv('APP_PORT')),

    // Configuración de la base de datos
    dbPort: Number(getEnv('DB_PORT', 5432)),  // Puerto predeterminado: 5432
    dbHost: getEnv<string>('DB_HOST', 'localhost'),
    dbName: getEnv<string>('DB_NAME', 'remittance_db'),
    dbUser: getEnv<string>('DB_USER', 'postgres'),
    dbPassword: getEnv<string>('DB_PASSWORD'),

    // Configuración de Bcrypt
    bcryptSaltRounds: Number(getEnv('BCRYPT_SALT_ROUNDS', 10)), // Valor predeterminado: 10

    // Configuración de JWT
    jwtSecret: getEnv<string>('JWT_SECRET'),
    jwtExpiration: getEnv('JWT_EXPIRATION', '2H'), // Tiempo de expiración predeterminado: 2 horas
  };
});
