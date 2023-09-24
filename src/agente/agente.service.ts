import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgenteDto } from './dto/create-agente.dto';
import { UpdateAgenteDto } from './dto/update-agente.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agente } from './entities/agente.entity';

@Injectable()
export class AgenteService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Agente)
    private readonly agentRepository: Repository<Agente>,
  ) {}

  async create(createAgenteDto: CreateAgenteDto) {
    try {
      const user = this.agentRepository.create({
        name: createAgenteDto.name,
        email: createAgenteDto.email,
        id: createAgenteDto.id,
        role: 3,
      });
      await this.agentRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      if (error.code == 23505) {
        throw new BadRequestException('El usuario ya existe');
      }
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async findAll() {
    try {
      const users = await this.agentRepository.find({
        where: { active: true },
        relations: ['role'],
      });
      return users;
    } catch (error) {
      throw new BadRequestException('No se encontraron usuarios');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.agentRepository.findOne({
        where: { id, active: true },
      });
      if (!user) throw new Error();
      return user;
    } catch (error) {
      throw new NotFoundException('No se encontro el usuario');
    }
  }

  async update(id: number, updateAgenteDto: UpdateAgenteDto) {
    try {
      let user = await this.findOne(id);
      user = { ...user, name: updateAgenteDto.name };
      await this.agentRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      user.active = false;
      await this.agentRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create({
        name: createRoleDto.name,
      });
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException('El rol ya existe');
      }
      throw new InternalServerErrorException('Error en el servidor');
    }
  }
}
