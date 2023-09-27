import { Module } from '@nestjs/common';
import { InvgateModule } from './invgate/invgate.module';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViaSolicitudModule } from './via_solicitud/via_solicitud.module';
import { SegmentoModule } from './segmento/segmento.module';
import { PaisModule } from './pais/pais.module';
import { TipoModule } from './tipo/tipo.module';
import { AgenteModule } from './agente/agente.module';
import { ScheduleModule as TaskModule } from './schedule/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    InvgateModule,
    DataModule,
    CommonModule,
    ViaSolicitudModule,
    SegmentoModule,
    PaisModule,
    TipoModule,
    AgenteModule,
    ScheduleModule.forRoot(),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
