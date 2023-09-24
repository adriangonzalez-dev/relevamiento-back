import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { InvgateService } from 'src/invgate/invgate.service';
import { Data } from './entities/data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {
  constructor(
    private readonly invgateService: InvgateService,
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>,
  ) {}

  create(createDatumDto: CreateDataDto) {
    return createDatumDto;
  }

  async findAll(): Promise<any> {
    try {
      return await this.updatedData();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    id;
  }

  update(id: number, updateDatumDto: UpdateDataDto) {
    return updateDatumDto;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }

  async updatedData() {
    try {
      const tickets = await this.invgateService.getAllInfoInvgate();
      tickets.forEach(async (ticket) => {
        const existsTicket = await this.dataRepository.findOne({
          where: { id: Number(ticket.id) },
        });
        if (!existsTicket) {
          const newTicket = this.dataRepository.create({
            id: ticket.id,
            country_id: ticket.location_id,
            id_agent: ticket.assigned_id,
            implementation_date: ticket.closed_at,
            request: ticket.title,
            request_date: ticket.created_at,
            type_id: ticket.category_id,
            via_id: 3,
          });
          await this.dataRepository.save(newTicket);
        }
      });
      const ticketsResponse = await this.dataRepository.find({
        relations: ['country_id', 'type_id', 'via_id'],
      });
      return ticketsResponse;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
