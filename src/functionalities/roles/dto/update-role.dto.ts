import { PartialType } from "@nestjs/mapped-types";
import { CreateRoleDto } from "./create-role.dto";

/**
 * DTO para la actualización de un rol.
 * 
 * Esta clase extiende de `CreateRoleDto` usando `PartialType` para hacer que todos los campos sean opcionales,
 * permitiendo realizar actualizaciones parciales de los datos del rol. 
 * Solo los campos proporcionados en la solicitud de actualización serán modificados,
 * lo que permite que el resto de los campos permanezcan sin cambios.
 * 
 * Esto es útil cuando se desea actualizar solo algunos detalles de un rol sin tener que enviar toda la información
 * de nuevo.
 */
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
