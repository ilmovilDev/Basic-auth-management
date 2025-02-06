import { Column, CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enums";

/**
 * Clase base para entidades en la base de datos, proporcionando campos comunes.
 * 
 * Esta clase incluye un identificador único, un estado, y marcas de tiempo 
 * para la creación y actualización de registros. Es una clase base que debe ser extendida 
 * por otras entidades en la aplicación para estandarizar la estructura de los registros en la base de datos.
 */
export class BaseEntity {
    /** 
     * Identificador único generado automáticamente en formato UUID. 
     * Se indexa para mejorar el rendimiento en las consultas.
     */
    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** 
     * Estado de la entidad, que puede ser `active` o `inactive`.
     * Por defecto, las entidades se crean con el estado `active`.
     */
    @Column({ type: 'enum', enum: Status, default: Status.active })
    status: Status;

    /** 
     * Fecha de creación del registro, asignada automáticamente al insertarse en la base de datos.
     */
    @CreateDateColumn()
    createdAt: Date;
  
    /** 
     * Fecha de la última actualización del registro, actualizada automáticamente al modificar el registro.
     */
    @UpdateDateColumn()
    updatedAt: Date;

    /** 
     * Fecha de eliminación suave del registro, se establece cuando se elimina lógicamente (opcional).
     */
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}
