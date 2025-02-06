import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/functionalities/common/entities";

/**
 * Entidad `Role` que representa un rol en el sistema.
 * 
 * Esta clase extiende `BaseEntity`, lo que le proporciona campos comunes como `id`, `status`, `createdAt`, `updatedAt`, 
 * y `deletedAt`. Además, incluye campos específicos para el rol, como el `name` y `description`.
 * 
 * La entidad `Role` se utiliza para definir los diferentes roles que un usuario puede tener en el sistema,
 * como `admin`, `user`, etc.
 */
@Entity('Role')
export class Role extends BaseEntity {

    /** 
     * Nombre del rol, que debe ser único en el sistema. 
     * No puede ser nulo.
     * 
     * Mensaje de error (si es necesario):
     * - Si el nombre no es único: "El nombre del rol debe ser único."
     * - Si está vacío: "El nombre del rol es obligatorio."
     */
    @Column({ type: 'varchar', unique: true, nullable: false, length: 55 })
    name: string;
    
}
