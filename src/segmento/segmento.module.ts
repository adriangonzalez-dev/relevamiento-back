import { Module } from '@nestjs/common';
import { SegmentoService } from './segmento.service';
import { SegmentoController } from './segmento.controller';

@Module({
  controllers: [SegmentoController],
  providers: [SegmentoService]
})
export class SegmentoModule {}
