import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entity/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { handleDBErrors, normalizeText } from '../common/utils';
import { PaginationDto } from '../common/dtos';
import { isUUID } from 'class-validator';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Crea un nuevo rol en la base de datos.
   * @param createRoleDto DTO con los datos del rol a crear.
   * @returns El rol creado.
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create({
      ...createRoleDto,
      name: normalizeText(createRoleDto.name),
    });
    return this.save(role);
  }

  /**
   * Obtiene una lista paginada de roles.
   * @param paginationDto DTO con los parámetros de paginación.
   * @returns Lista de roles paginada.
   */
  async findAll({ limit = 10, offset = 0 }: PaginationDto): Promise<Role[]> {
    const roles = await this.roleRepository.find({ take: limit, skip: offset });

    if (!roles.length) {
      throw new NotFoundException('No se encontraron roles.');
    }
    return roles;
  }

  /**
   * Busca un rol por su ID o nombre.
   * @param term Identificador único (UUID) o nombre del rol.
   * @returns El rol encontrado.
   */
  async findOne(term: string): Promise<Role> {
    const role = isUUID(term) ? await this.findById(term) : await this.findByName(term);
    if (!role) {
      throw new NotFoundException(`No se encontró un rol con el identificador: ${term}`);
    }
    return role;
  }

  /**
   * Busca un rol por su ID.
   * @param id Identificador único del rol.
   * @returns El rol encontrado o null si no existe.
   */
  private async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  /**
   * Busca un rol por su nombre.
   * @param name Nombre del rol.
   * @returns El rol encontrado o null si no existe.
   */
  private async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }

  /**
   * Actualiza un rol en la base de datos.
   * @param id Identificador del rol a actualizar.
   * @param updateRoleDto DTO con los datos a actualizar.
   * @returns El rol actualizado.
   */
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    return this.save(role);
  }

  /**
   * Elimina un rol de la base de datos.
   * @param id Identificador del rol a eliminar.
   * @returns Un mensaje confirmando la eliminación.
   */
  async delete(id: string): Promise<{ message: string }> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return { message: `El rol con ID ${id} fue eliminado con éxito.` };
  }

  /**
   * Guarda un rol en la base de datos y maneja posibles errores.
   * @param role Instancia de rol a guardar.
   * @returns El rol guardado.
   */
  private async save(role: Role): Promise<Role> {
    try {
      return await this.roleRepository.save(role);
    } catch (error) {
      handleDBErrors(error);
    }
  }

  // Temporal
  async deleteAll(){
    return await this.roleRepository.delete({});
  }

}
