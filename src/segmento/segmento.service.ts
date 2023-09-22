import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSegmentoDto } from './dto/create-segmento.dto';
import { UpdateSegmentoDto } from './dto/update-segmento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from './entities/segmento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SegmentoService {
  constructor(
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,
  ) {}

  async create(createSegmentoDto: CreateSegmentoDto) {
    try {
      const segment = this.segmentRepository.create({
        name: createSegmentoDto.name,
      });
      await this.segmentRepository.save(segment);
      return segment;
    } catch (error) {
      console.log(error);
      if (error.code == 23505) {
        throw new BadRequestException('El segmento ya existe');
      }
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async findAll() {
    try {
      const vias = await this.segmentRepository.find({
        where: { active: true },
      });
      return vias;
    } catch (error) {
      throw new BadRequestException('No se encontraron segmentos');
    }
  }

  async findOne(id: number) {
    try {
      const via = await this.segmentRepository.findOne({
        where: { id, active: true },
      });
      if (!via) throw new Error();
      return via;
    } catch (error) {
      throw new NotFoundException('No se encontro el segmento');
    }
  }

  async update(id: number, updateSegmentoDto: UpdateSegmentoDto) {
    try {
      let via = await this.findOne(id);
      via = { ...via, ...updateSegmentoDto };
      await this.segmentRepository.save(via);
      return via;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const via = await this.findOne(id);
      via.active = false;
      await this.segmentRepository.save(via);
      return via;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
