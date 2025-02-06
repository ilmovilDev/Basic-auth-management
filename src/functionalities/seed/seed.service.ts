import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SeedData } from './data/data.seed';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly roleService: RolesService,
    private readonly seedData: SeedData
  ) {}

  /**
   * Ejecuta el proceso de inicialización (seed) de la base de datos.
   * @returns Un mensaje de confirmación si el proceso se ejecuta correctamente.
   */
  async runSeed(): Promise<{ ok: boolean; mensaje: string }> {
    this.logger.log('Iniciando el proceso de seed...');

    try {
      this.logger.log('Limpiando la base de datos...');
      await this.clearDatabase();

      this.logger.log('Insertando roles en la base de datos...');
      await this.insertRoles();

      this.logger.log('Proceso de seed completado con éxito.');
      return { ok: true, mensaje: 'Proceso de seed ejecutado con éxito.' };
    } catch (error) {
      this.logger.error('El proceso de seed ha fallado.', error.stack);
      throw new InternalServerErrorException(
        'El proceso de seed ha fallado. Consulte los logs para más detalles.'
      );
    }
  }

  /**
   * Elimina todos los datos relevantes de la base de datos antes de ejecutar el seed.
   */
  private async clearDatabase(): Promise<void> {
    await this.roleService.deleteAll();
  }

  /**
   * Inserta los roles predefinidos en la base de datos.
   */
  private async insertRoles(): Promise<void> {
    const roles = this.seedData.getRoles();
    for (const role of roles) {
      await this.roleService.create(role);
    }
  }
}
