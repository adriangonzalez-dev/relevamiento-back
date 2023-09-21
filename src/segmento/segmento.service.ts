import { Injectable } from '@nestjs/common';
import { CreateSegmentoDto } from './dto/create-segmento.dto';
import { UpdateSegmentoDto } from './dto/update-segmento.dto';

@Injectable()
export class SegmentoService {
  create(createSegmentoDto: CreateSegmentoDto) {
    return 'This action adds a new segmento';
  }

  findAll() {
    return `This action returns all segmento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} segmento`;
  }

  update(id: number, updateSegmentoDto: UpdateSegmentoDto) {
    return `This action updates a #${id} segmento`;
  }

  remove(id: number) {
    return `This action removes a #${id} segmento`;
  }
}
