import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateViaSolicitudDto } from './dto/create-via_solicitud.dto';
import { UpdateViaSolicitudDto } from './dto/update-via_solicitud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Via } from './entities/via_solicitud.entity';

@Injectable()
export class ViaSolicitudService {
  constructor(
    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>,
  ) {}

  async create(createViaSolicitudDto: CreateViaSolicitudDto) {
    try {
      const via = this.viaRepository.create({
        name: createViaSolicitudDto.name,
      });
      await this.viaRepository.save(via);
      return via;
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException(
          'El nombre de la via de solicitud ya existe',
        );
      }
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async findAll() {
    try {
      const vias = await this.viaRepository.find({
        where: { active: true },
      });
      return vias;
    } catch (error) {
      throw new BadRequestException('No se encontraron vias de solicitud');
    }
  }

  async findOne(id: number) {
    try {
      const via = await this.viaRepository.findOne({
        where: { id, active: true },
      });
      if (!via) throw new Error();
      return via;
    } catch (error) {
      throw new NotFoundException('No se encontro la via de solicitud');
    }
  }

  async findOneByName(name: string) {
    try {
      const via = await this.viaRepository.findOne({
        where: { name, active: true },
      });
      if (!via) throw new Error();
      return via;
    } catch (error) {
      throw new NotFoundException('No se encontro la via de solicitud');
    }
  }

  async update(id: number, updateViaSolicitudDto: UpdateViaSolicitudDto) {
    try {
      let via = await this.findOne(id);
      via = { ...via, ...updateViaSolicitudDto };
      await this.viaRepository.save(via);
      return via;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const via = await this.findOne(id);
      via.active = false;
      await this.viaRepository.save(via);
      return via;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
