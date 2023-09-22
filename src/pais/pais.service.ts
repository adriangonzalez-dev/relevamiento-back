import { Injectable } from '@nestjs/common';
import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';

@Injectable()
export class CountryService {
  create(createPaiDto: CreatePaiDto) {
    return createPaiDto;
  }

  findAll() {
    return `This action returns all pais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pai`;
  }

  update(id: number, updatePaiDto: UpdatePaiDto) {
    updatePaiDto;
    return `This action updates a #${id} pai`;
  }

  remove(id: number) {
    return `This action removes a #${id} pai`;
  }
}
