import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { InvgateService } from 'src/invgate/invgate.service';
import { Data } from './entities/data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from 'src/pais/pais.service';
import { TipoService } from 'src/tipo/tipo.service';
import { ViaSolicitudService } from 'src/via_solicitud/via_solicitud.service';

@Injectable()
export class DataService {
  constructor(
    private readonly invgateService: InvgateService,
    private readonly countryService: CountryService,
    private readonly typeService: TipoService,
    private readonly viaService: ViaSolicitudService,
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>,
  ) {}

  async create(createDataDto: CreateDataDto) {
    try {
      const data = this.dataRepository.create(createDataDto);
      await this.dataRepository.save(data);
      return await this.findAll();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<any> {
    try {
      const ticketsResponse = await this.dataRepository.find({
        relations: ['country', 'type', 'via', 'segment', 'agent'],
        order: {
          request_date: 'ASC', // o 'DESC' para ordenar de manera descendente
        },
      });
      if (ticketsResponse.length === 0) return [];
      const currentDate = new Date();
      const currentYear = /* currentDate.getFullYear(); */2024 //Hardcodeado para que traiga datos de diciembre 2023
      const currentMonth = /* currentDate.getMonth(); */0
      const filteredData = ticketsResponse.filter((ticket) => {
        const requestDate = new Date(ticket.request_date * 1000);
        return (
          requestDate.getFullYear() === currentYear &&
          requestDate.getMonth() === currentMonth
        );
      });
      return filteredData;
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
      const invgateVia = await this.viaService.findOneByName('Invgate SIA');
      tickets.forEach(async (ticket) => {
        const existsTicket = await this.dataRepository.findOne({
          where: { id_invgate: Number(ticket.id) },
        });
        if (!existsTicket) {
          const newTicket = this.dataRepository.create({
            id_invgate: ticket.id,
            country: ticket.location_id,
            agent: ticket.assigned_id,
            implementation_date: ticket.closed_at,
            request: ticket.title,
            request_date: ticket.created_at,
            type: ticket.category_id,
            via: invgateVia.id,
          });
          await this.dataRepository.save(newTicket);
        }
      });
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
      if (openTickets.length < 1) return;
      const idsTickets = openTickets
        .map((ticket) => {
          if (ticket.id_invgate) {
            return ticket.id_invgate;
          }
        })
        .filter((item) => item !== undefined && item !== null);
      const tickets = await this.invgateService.getIncidentsById(idsTickets);
      for (const ticket of openTickets) {
        for (const incident of tickets) {
          if (Number(ticket.id_invgate) === Number(incident.id)) {
            if (incident.solved_at !== null) {
              ticket.implementation_date = Number(incident.solved_at);
              await this.dataRepository.save(ticket);
            }
          }
        }
      }
      /* openTickets.forEach(async (ticket) => {
        tickets.forEach(async (incident) => {
          if (ticket.id === incident.id && incident.solved_at !== null) {
            ticket.implementation_date = Number(incident.solved_at);
          }
          await this.dataRepository.save(ticket);
        });
      }); */
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
