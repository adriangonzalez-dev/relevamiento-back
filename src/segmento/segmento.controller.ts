import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SegmentoService } from './segmento.service';
import { CreateSegmentoDto } from './dto/create-segmento.dto';
import { UpdateSegmentoDto } from './dto/update-segmento.dto';

@Controller('segmento')
export class SegmentoController {
  constructor(private readonly segmentoService: SegmentoService) {}

  @Post()
  create(@Body() createSegmentoDto: CreateSegmentoDto) {
    return this.segmentoService.create(createSegmentoDto);
  }

  @Get()
  findAll() {
    return this.segmentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentoDto: UpdateSegmentoDto) {
    return this.segmentoService.update(+id, updateSegmentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.segmentoService.remove(+id);
  }
}
