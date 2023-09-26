import { Module } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { TipoController } from './tipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entities/tipo.entity';
import { InvgateModule } from 'src/invgate/invgate.module';

@Module({
  controllers: [TipoController],
  providers: [TipoService],
  imports: [InvgateModule, TypeOrmModule.forFeature([Type])],
  exports: [TipoService],
})
export class TipoModule {}
