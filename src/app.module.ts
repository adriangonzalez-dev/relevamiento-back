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
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.POSTGRES_HOST),
      port: Number(process.env.POSTGRES_PORT),
      database: String(process.env.POSTGRES_DB),
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
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
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
