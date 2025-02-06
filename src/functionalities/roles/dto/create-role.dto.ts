import { IsNotEmpty, IsString, Length } from "class-validator";

/**
 * DTO (Data Transfer Object) para la creación y actualización de un rol.
 * 
 * Este DTO es utilizado para validar los datos que se reciben al crear o actualizar un rol en el sistema.
 * Incluye validaciones de los campos `name` y `description`, asegurando que cumplan con los requisitos de formato y longitud.
 */
export class CreateRoleDto {

    /** 
     * Nombre del rol, que debe ser una cadena no vacía y con una longitud entre 3 y 55 caracteres.
     * 
     * Mensajes de error:
     * - Si el campo está vacío: "El nombre del rol es obligatorio."
     * - Si no es una cadena: "El nombre del rol debe ser una cadena de texto."
     * - Si la longitud es incorrecta: "El nombre del rol debe tener entre 3 y 55 caracteres."
     */
    @IsNotEmpty({ message: 'El nombre del rol es obligatorio.' })
    @IsString({ message: 'El nombre del rol debe ser una cadena de texto.' })
    @Length(3, 55, { message: 'El nombre del rol debe tener entre 3 y 55 caracteres.' })
    name: string;

}
