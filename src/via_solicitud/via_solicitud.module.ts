import { Module } from '@nestjs/common';
import { ViaSolicitudService } from './via_solicitud.service';
import { ViaSolicitudController } from './via_solicitud.controller';
import { Via } from './entities/via_solicitud.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ViaSolicitudController],
  providers: [ViaSolicitudService],
  imports: [TypeOrmModule.forFeature([Via])],
})
export class ViaSolicitudModule {}
