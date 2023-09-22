import { Module } from '@nestjs/common';
import { CountryService } from './pais.service';
import { CountryController } from './pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/pais.entity';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [TypeOrmModule.forFeature([Country])],
})
export class PaisModule {}
