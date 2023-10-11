import { Injectable } from '@nestjs/common';
import { GoogleAPIAdapter } from 'src/common/adapter/google-adapter';

interface Tickets_lvl1 {
  timestamp: Date;
  user: string;
  invgate: string;
  country: string;
  ticket_number: number;
  ticket_name: string;
  description: string;
  local: string;
  type: string;
  segment: string;
  resolution: string;
}

interface Audits {
  auditor: string;
  title: string;
  timestamp: Date;
  type: string;
  country: string;
  resolution_lvl1: string;
  category_ticket: string;
  origin: string;
  resolution: string;
  segment: string;
  via: string;
  ticket_number: number;
  comments: string;
}

@Injectable()
export class GoogleapisService {
  constructor(private readonly googleAuthService: GoogleAPIAdapter) {}
  create() {
    return 'This action adds a new googleapi';
  }

  async getDataLvl1() {
    const data = await this.googleAuthService.getDataLvl1();
    const result = [];

    for (let i = 1; i < data.length; i++) {
      const fechaString = data[i][0];
      const partes = fechaString.split(' '); // Divide la cadena en fecha y hora

      const fechaPartes = partes[0].split('/'); // Divide la parte de la fecha
      const horaPartes = partes[1].split(':'); // Divide la parte de la hora

      // Construye un objeto Date en el formato esperado
      const fecha = new Date(
        parseInt(fechaPartes[2]), // Año
        parseInt(fechaPartes[1]) - 1, // Mes (restamos 1 porque los meses en JavaScript son de 0 a 11)
        parseInt(fechaPartes[0]), // Día
        parseInt(horaPartes[0]), // Hora
        parseInt(horaPartes[1]), // Minutos
        parseInt(horaPartes[2]), // Segundos
      );

      const obj: Tickets_lvl1 = {
        timestamp: undefined,
        user: '',
        invgate: '',
        country: '',
        ticket_number: 0,
        ticket_name: '',
        description: '',
        local: '',
        type: '',
        segment: '',
        resolution: '',
      };

      obj.timestamp = fecha;
      obj.user = data[i][1].split('@')[0];
      obj.invgate = data[i][2];
      obj.country = data[i][3];
      obj.ticket_number = +data[i][4].split('-')[1];
      obj.ticket_name = data[i][5];
      obj.description = data[i][6];
      obj.local = data[i][7];
      obj.type = data[i][8];
      obj.segment = data[i][9];
      obj.resolution = data[i][10];
      result.push(obj);
    }

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();

    // Filtra los objetos para obtener solo aquellos del mes actual
    const objetosDelMesActual = result.filter((objeto) => {
      const fecha = new Date(objeto.timestamp);
      return fecha.getMonth() === mesActual;
    });
    return objetosDelMesActual;
  }

  async getDataAudit() {
    const data = await this.googleAuthService.getDataAudit();
    const result = [];

    for (let i = 1; i < data.length; i++) {
      const fechaString = data[i][2];
      const añoPredeterminado = new Date().getFullYear();

      const [dia, mes] = fechaString.split('/');
      const fecha = new Date(`${añoPredeterminado}-${mes}-${dia}`);

      const obj: Audits = {
        timestamp: undefined,
        auditor: '',
        title: '',
        type: '',
        country: '',
        resolution_lvl1: '',
        category_ticket: '',
        origin: '',
        resolution: '',
        segment: '',
        via: '',
        ticket_number: 0,
        comments: '',
      };

      obj.timestamp = fecha;
      obj.auditor = data[i][0];
      obj.title = data[i][1];
      obj.type = data[i][3];
      obj.country = data[i][4];
      obj.resolution_lvl1 = data[i][5];
      obj.category_ticket = data[i][6];
      obj.origin = data[i][7];
      obj.resolution = data[i][8];
      obj.segment = data[i][9];
      obj.via = data[i][10];
      obj.ticket_number = +data[i][11].split('-')[1];
      obj.comments = data[i][12];

      result.push(obj);
    }

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();

    // Filtra los objetos para obtener solo aquellos del mes actual
    const objetosDelMesActual = result.filter((objeto) => {
      const fecha = new Date(objeto.timestamp);
      return fecha.getMonth() === mesActual;
    });
    return result;
  }

  async getParamsData() {
    const dataTickets = await this.getDataLvl1();
    const dataAudits = await this.getDataAudit();
    let totalPais = [];
    let totalDescription = [];
    let totalResolution = [];

    let totalPaisAudits = [];
    let resolutionAudits = [];
    let categoryTicketAudits = [];
    let type_resolutionAudits = [];

    const contadores = {
      country: {},
      description: {},
      resolution: {},
    };

    dataTickets.forEach((dato) => {
      for (const campo in contadores) {
        const valor = dato[campo];
        if (valor) {
          if (contadores[campo][valor]) {
            contadores[campo][valor]++;
          } else {
            contadores[campo][valor] = 1;
          }
        }
      }
    });

    totalPais = Object.keys(contadores.country).map((pais) => ({
      pais,
      cantidad: contadores.country[pais],
    }));
    totalDescription = Object.keys(contadores.description).map((descr) => ({
      descr,
      cantidad: contadores.description[descr],
    }));
    totalResolution = Object.keys(contadores.resolution).map((resolution) => ({
      resolution,
      cantidad: contadores.resolution[resolution],
    }));

    const contadoresAudits = {
      country: {},
      resolution_lvl1: {},
      category_ticket: {},
      resolution: {},
    };

    dataAudits.forEach((dato) => {
      for (const campo in contadoresAudits) {
        const valor = dato[campo];
        if (valor) {
          if (contadoresAudits[campo][valor]) {
            contadoresAudits[campo][valor]++;
          } else {
            contadoresAudits[campo][valor] = 1;
          }
        }
      }
    });

    totalPaisAudits = Object.keys(contadoresAudits.country).map((pais) => ({
      pais,
      cantidad: contadoresAudits.country[pais],
    }));
    resolutionAudits = Object.keys(contadoresAudits.resolution_lvl1).map(
      (descr) => ({
        descr,
        cantidad: contadoresAudits.resolution_lvl1[descr],
      }),
    );
    categoryTicketAudits = Object.keys(contadoresAudits.category_ticket).map(
      (category) => ({
        category,
        cantidad: contadoresAudits.category_ticket[category],
      }),
    );
    type_resolutionAudits = Object.keys(contadoresAudits.resolution).map(
      (res) => ({
        res,
        cantidad: contadoresAudits.resolution[res],
      }),
    );

    return {
      totalPaisTickets: totalPais,
      totalDescriptionTickets: totalDescription,
      totalResolutionTickets: totalResolution,
      totalPaisAudits: totalPaisAudits,
      resolutionAudits: resolutionAudits,
      categoryTicketAudits: categoryTicketAudits,
      type_resolutionAudits: type_resolutionAudits,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} googleapi`;
  }
}
