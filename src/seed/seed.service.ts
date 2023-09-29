import { BadRequestException, Injectable } from '@nestjs/common';
import { roleData, segmentData, viaData, userData } from './seed.data';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from 'src/segmento/entities/segmento.entity';
import { Via } from 'src/via_solicitud/entities/via_solicitud.entity';
import { Role } from 'src/agente/entities/role.entity';
import { Agente } from 'src/agente/entities/agente.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,
    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Agente)
    private readonly agentRepository: Repository<Agente>,
  ) {}

  async seedDB() {
    try {
      await this.createSegment();
      await this.createRoles();
      await this.createVia();
      await this.createUsers();
      return 'Seed db ok';
    } catch (error) {
      new BadRequestException(error.message);
    }
  }
  async createSegment() {
    try {
      const arraySegment = await Promise.all(
        segmentData.map((segment) => this.segmentRepository.create(segment)),
      );
      return await Promise.all(
        arraySegment.map((segment) => this.segmentRepository.save(segment)),
      );
    } catch (error) {
      console.log(error);
      new BadRequestException(error.message);
    }
  }

  async createRoles() {
    try {
      const arrayRoles = await Promise.all(
        roleData.map((role) => this.roleRepository.create(role)),
      );
      return await Promise.all(
        arrayRoles.map((role) => this.roleRepository.save(role)),
      );
    } catch (error) {
      console.log(error);
      new BadRequestException(error.message);
    }
  }

  async createVia() {
    try {
      const arrayVia = await Promise.all(
        viaData.map((via) => this.viaRepository.create(via)),
      );
      return await Promise.all(
        arrayVia.map((via) => this.viaRepository.save(via)),
      );
    } catch (error) {
      console.log(error);
      new BadRequestException(error.message);
    }
  }

  async createUsers() {
    try {
      const roleUser = await this.roleRepository.findOne({
        where: { name: 'user' },
      });
      const newData = userData.map((user) => {
        user.role = roleUser.id;
        return user;
      });
      const arrayUsers = await Promise.all(
        newData.map((user) => this.agentRepository.create(user)),
      );
      return await Promise.all(
        arrayUsers.map((user) => this.agentRepository.save(user)),
      );
    } catch (error) {
      console.log(error);
      new BadRequestException(error.message);
    }
  }
}
