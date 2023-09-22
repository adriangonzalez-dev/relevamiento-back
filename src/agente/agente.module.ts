import { Module } from '@nestjs/common';
import { AgenteService } from './agente.service';
import { AgenteController } from './agente.controller';
import { Agente } from './entities/agente.entity';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AgenteController],
  providers: [AgenteService],
  imports: [TypeOrmModule.forFeature([Agente, Role])],
})
export class AgenteModule {}
