import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from 'src/segmento/entities/segmento.entity';
import { Via } from 'src/via_solicitud/entities/via_solicitud.entity';
import { Role } from 'src/agente/entities/role.entity';
import { Agente } from 'src/agente/entities/agente.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule.forFeature([Segment, Via, Role, Agente])],
})
export class SeedModule {}
