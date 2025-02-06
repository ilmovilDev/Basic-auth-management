import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SeedData } from './data/data.seed';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [SeedController],
  providers: [SeedService, SeedData],
})
export class SeedModule {}
