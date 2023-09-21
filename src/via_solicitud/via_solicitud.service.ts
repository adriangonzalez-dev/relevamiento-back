import { Injectable } from '@nestjs/common';
import { CreateViaSolicitudDto } from './dto/create-via_solicitud.dto';
import { UpdateViaSolicitudDto } from './dto/update-via_solicitud.dto';

@Injectable()
export class ViaSolicitudService {
  create(createViaSolicitudDto: CreateViaSolicitudDto) {
    return 'This action adds a new viaSolicitud';
  }

  findAll() {
    return `This action returns all viaSolicitud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viaSolicitud`;
  }

  update(id: number, updateViaSolicitudDto: UpdateViaSolicitudDto) {
    return `This action updates a #${id} viaSolicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} viaSolicitud`;
  }
}
