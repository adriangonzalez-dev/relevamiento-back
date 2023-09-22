import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountryService } from './pais.service';
import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';

@Controller('pais')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createPaiDto: CreatePaiDto) {
    return this.countryService.create(createPaiDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiDto: UpdatePaiDto) {
    return this.countryService.update(+id, updatePaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
