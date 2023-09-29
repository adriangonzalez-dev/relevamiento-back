import { Module } from '@nestjs/common';
import { SegmentoService } from './segmento.service';
import { SegmentoController } from './segmento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './entities/segmento.entity';

@Module({
  controllers: [SegmentoController],
  providers: [SegmentoService],
  imports: [TypeOrmModule.forFeature([Segment])],
  exports: [SegmentoService],
})
export class SegmentoModule {}
