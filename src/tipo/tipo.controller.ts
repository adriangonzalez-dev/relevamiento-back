import { Controller, Get } from '@nestjs/common';
import { TipoService } from './tipo.service';

@Controller('tipo')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Get()
  findAll() {
    return this.tipoService.updateTypes();
  }
}
