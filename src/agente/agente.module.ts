import { Module } from '@nestjs/common';
import { AgenteService } from './agente.service';
import { AgenteController } from './agente.controller';

@Module({
  controllers: [AgenteController],
  providers: [AgenteService]
})
export class AgenteModule {}
