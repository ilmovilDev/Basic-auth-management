import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

/**
 * DTO para manejar la paginación en las solicitudes.
 * 
 * Permite definir el número de registros a recuperar (`limit`) y desde qué punto comenzar (`offset`).
 * Ambos parámetros son opcionales y se convierten automáticamente a tipo `Number` si `enableImplicitConversions` está activado.
 */
export class PaginationDto {

    /**
     * Límite de resultados a retornar en la consulta.
     * 
     * - Debe ser un número positivo.
     * - Es opcional.
     * - Se convierte automáticamente a número.
     * 
     * @example
     * ?limit=10
     */
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // enableImplicitConversions: true
    limit?: number;
    
    /**
     * Número de registros a omitir antes de comenzar a devolver resultados.
     * 
     * - Debe ser un número mayor o igual a 0.
     * - Es opcional.
     * - Se convierte automáticamente a número.
     * 
     * @example
     * ?offset=20
     */
    @IsOptional()
    @Min(0)
    @Type(() => Number) // enableImplicitConversions: true
    offset?: number;
}
