import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';

/**
 * Maneja los errores de la base de datos y lanza excepciones adecuadas según el tipo de error.
 *
 * @param {any} error - Objeto de error generado por la base de datos.
 * 
 * @throws {BadRequestException} Si el error corresponde a una clave única duplicada (código de error `23505`).
 * @throws {InternalServerErrorException} Para cualquier otro error inesperado en la base de datos.
 *
 * @example
 * try {
 *   // Operación en la base de datos
 * } catch (error) {
 *   handleDBErrors(error);
 * }
 */
export function handleDBErrors(error: any): void {
    const logger = new Logger('handleDBErrors');

    if (error.code === '23505') {
        // Manejo del error de clave única duplicada
        const conflictMessage = `Conflito: ${error.detail || 'Registro duplicado'}`;
        logger.warn(conflictMessage);
        throw new BadRequestException('Erro: Registro duplicado.');
    }

    // Cualquier otro error inesperado de la base de datos
    const unexpectedMessage = `Erro inesperado: ${error.message || error.stack}`;
    logger.error(unexpectedMessage);
    throw new InternalServerErrorException(
        'Erro inesperado. Por favor, verifique os logs do servidor.',
    );
}
