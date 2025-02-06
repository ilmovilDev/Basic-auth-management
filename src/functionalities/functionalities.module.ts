import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    CommonModule, 
    RolesModule, SeedModule
  ]
})
export class FunctionalitiesModule {}
