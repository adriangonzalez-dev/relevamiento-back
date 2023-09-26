import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { InvgateModule } from 'src/invgate/invgate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';
import { TipoModule } from 'src/tipo/tipo.module';
import { PaisModule } from 'src/pais/pais.module';

@Module({
  controllers: [DataController],
  providers: [DataService],
  imports: [
    InvgateModule,
    TipoModule,
    PaisModule,
    TypeOrmModule.forFeature([Data]),
  ],
})
export class DataModule {}
