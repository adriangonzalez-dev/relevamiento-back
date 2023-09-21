import { Module } from '@nestjs/common';
import { ViaSolicitudService } from './via_solicitud.service';
import { ViaSolicitudController } from './via_solicitud.controller';

@Module({
  controllers: [ViaSolicitudController],
  providers: [ViaSolicitudService]
})
export class ViaSolicitudModule {}
