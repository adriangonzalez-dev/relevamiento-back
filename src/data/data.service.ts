import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { InvgateService } from 'src/invgate/invgate.service';
import { Data } from './entities/data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from 'src/pais/pais.service';
import { TipoService } from 'src/tipo/tipo.service';

@Injectable()
export class DataService {
  constructor(
    private readonly invgateService: InvgateService,
    private readonly countryService: CountryService,
    private readonly typeService: TipoService,
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>,
  ) {}

  create(createDatumDto: CreateDataDto) {
    return createDatumDto;
  }

  async findAll(): Promise<any> {
    try {
      await this.updateDB();
      return { message: 'ok' };
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

  /**
   * La función busca tickets abiertos y actualiza su fecha de implementación si se han solucionado.
   * @returns la variedad de boletos abiertos.
   */
  async checkingClosedIncident() {
    try {
      const openTickets = await this.dataRepository.find({
        where: { implementation_date: null },
      });
      const idsTickets = openTickets.map((ticket) => ticket.id);
      const tickets = await this.invgateService.getIncidentsById(idsTickets);
      openTickets.forEach(async (ticket) => {
        tickets.forEach(async (incident) => {
          if (ticket.id === incident.id && incident.solved_at !== null) {
            ticket.implementation_date = Number(incident.solved_at);
          }
          await this.dataRepository.save(ticket);
        });
      });
      /* for (const ticket of openTickets) {
        const checkedTicket = await this.invgateService.getIncidentById(
          ticket.id,
        );
        if (checkedTicket.solved_at) {
          ticket.implementation_date = Number(checkedTicket.solved_at);
          await this.dataRepository.save(ticket);
        }
      } */
    } catch (error) {
      console.log(error);
    }
  }

  async updateDB() {
    try {
      await this.countryService.updatedCountries();
      await this.typeService.updateTypes();
      await this.updatedData();
      await this.checkingClosedIncident();
    } catch (error) {
      console.log(error);
    }
  }
}
