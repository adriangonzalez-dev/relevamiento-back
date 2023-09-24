import { Module } from '@nestjs/common';
import { CountryService } from './pais.service';
import { CountryController } from './pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/pais.entity';
import { InvgateModule } from 'src/invgate/invgate.module';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [InvgateModule, TypeOrmModule.forFeature([Country])],
})
export class PaisModule {}
