import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

type AppConfig = {
  appPort: number;

  // Database
  dbPort: number;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;

  // Bcrypt
  bcryptSaltRounds: number;

  // JWT
  jwtSecret: string;
  jwtExpiration: string;
};

export default registerAs('app', (): AppConfig => {
  // Helper to parse and validate environment variables
  const getEnv = <T>(key: string, defaultValue?: T): T => {
    const value = process.env[key];
    if (value === undefined || value === null) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new InternalServerErrorException(`Variável de ambiente necessária ausente: ${key}. Por favor, verifique sua configuração.`);
    }
    return value as T;
  };

  return {
    // Application
    appPort: Number(getEnv('APP_PORT')),

    // Database
    dbPort: Number(getEnv('DB_PORT', 5432)),
    dbHost: getEnv<string>('DB_HOST', 'localhost'),
    dbName: getEnv<string>('DB_NAME', 'remittance_db'),
    dbUser: getEnv<string>('DB_USER', 'postgres'),
    dbPassword: getEnv<string>('DB_PASSWORD'),

    // Bcrypt
    bcryptSaltRounds: Number(getEnv('BCRYPT_SALT_ROUNDS', 10)),

    // JWT
    jwtSecret: getEnv<string>('JWT_SECRET'),
    jwtExpiration: getEnv('JWT_EXPIRATION', '2H'),
  };
});
