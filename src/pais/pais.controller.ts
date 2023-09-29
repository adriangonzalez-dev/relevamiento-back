import { Controller, Get } from '@nestjs/common';
import { CountryService } from './pais.service';

@Controller('pais')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }
}
