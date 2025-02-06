import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { PaginationDto } from '../common/dtos';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Crea un nuevo rol en la base de datos.
   * @param createRoleDto Datos necesarios para crear un rol.
   * @returns El rol creado.
   */
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  /**
   * Obtiene una lista paginada de roles.
   * @param paginationDto Parámetros de paginación (opcional).
   * @returns Una lista de roles.
   */
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rolesService.findAll(paginationDto);
  }

  /**
   * Obtiene un rol por su identificador o nombre.
   * @param term Identificador único (UUID) o nombre del rol.
   * @returns El rol encontrado.
   */
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.rolesService.findOne(term);
  }

  /**
   * Actualiza un rol en la base de datos.
   * @param term Identificador único (UUID) o nombre del rol.
   * @param updateRoleDto Datos a actualizar.
   * @returns El rol actualizado.
   */
  @Patch(':term')
  update(@Param('term') term: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(term, updateRoleDto);
  }

  /**
   * Elimina un rol de la base de datos.
   * @param id Identificador único del rol (UUID).
   * @returns Un mensaje confirmando la eliminación.
   */
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.delete(id);
  }
  
}
