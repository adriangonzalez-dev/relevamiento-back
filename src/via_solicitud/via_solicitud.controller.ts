import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViaSolicitudService } from './via_solicitud.service';
import { CreateViaSolicitudDto } from './dto/create-via_solicitud.dto';
import { UpdateViaSolicitudDto } from './dto/update-via_solicitud.dto';

@Controller('via-solicitud')
export class ViaSolicitudController {
  constructor(private readonly viaSolicitudService: ViaSolicitudService) {}

  @Post()
  create(@Body() createViaSolicitudDto: CreateViaSolicitudDto) {
    return this.viaSolicitudService.create(createViaSolicitudDto);
  }

  @Get()
  findAll() {
    return this.viaSolicitudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viaSolicitudService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateViaSolicitudDto: UpdateViaSolicitudDto,
  ) {
    return this.viaSolicitudService.update(+id, updateViaSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viaSolicitudService.remove(+id);
  }
}
