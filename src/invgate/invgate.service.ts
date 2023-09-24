import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapter/http-adapter';

interface RequestData {
  status: string;
  info: string;
  requests: { [key: string]: Incident };
}

export interface Incident {
  sla_incident_first_reply: string;
  custom_fields: { [key: string]: any }; // Array with custom fields IDs as keys and respective values
  type_id: number;
  assigned_group_id: number;
  source_id: number;
  solved_at: number;
  description: string;
  date_ocurred: string;
  closed_reason: number;
  assigned_id: number;
  sla_incident_resolution: string;
  user_id: number;
  creator_id: number;
  category_id: number;
  created_at: number;
  pretty_id: string;
  last_update: string;
  priority_id: number;
  closed_at: number | null;
  title: string;
  attachments: number[]; // Array with IDs of the attachments
  status_id: number;
  process_id: number;
  id: number; // Request ID
  location_id: number;
}

export interface Category {
  id: string;
  name: string;
  parent_category_id: number;
}

export interface Country {
  id: number;
  name: string;
  parent_id: number;
  total: number;
}

export interface ResponseUsers {
  records: Array<User>;
}

export interface User {
  id: number;
  user: string;
  role: number;
}

@Injectable()
export class InvgateService {
  private readonly url_api: string;
  private readonly url_api_olap: string;
  private readonly users: Array<number>;

  constructor(private readonly axiosAdapter: AxiosAdapter) {
    this.url_api = 'https://siaint.cloud.invgate.net/api/v1';
    this.url_api_olap = 'https://siaint.cloud.invgate.net/api-olap/v1';
    this.users = [423, 161, 1059, 1740];
  }
  /**
   * La función `getAllInfoInvgate` recupera de forma asincrónica incidentes para múltiples agentes y
   * los combina en una sola matriz.
   * @returns una serie de incidentes.
   */
  async getAllInfoInvgate() {
    try {
      const arrayPromises = this.users.map(async (id) => {
        return await this.getIncidentsForAgent(id);
      });
      const results = await Promise.all(arrayPromises);
      const combinedIncidents: Incident[] = results.reduce(
        (acc, agentIncidents) => {
          return [...acc, ...agentIncidents];
        },
        [],
      );

      return combinedIncidents;
    } catch (error) {
      console.log(error);
    }
  }

  async getTest() {
    try {
      const data = await this.getAllInfoInvgate();
      return data.map((incident) => incident.category_id);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCategories() {
    const data = await this.axiosAdapter.getInvgate<Promise<Category[]>>(
      `${this.url_api}/categories`,
    );
    return data;
  }

  async getUserById(id: number) {
    try {
      const { records } = await this.axiosAdapter.getInvgate<
        Promise<ResponseUsers>
      >(`${this.url_api_olap}/records/users?filter=id,eq,${id}`);
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllTypes() {
    const data = this.axiosAdapter.getInvgate(
      `${this.url_api}/incident.attributes.type`,
    );
    return data;
  }

  async getAllLocations() {
    const data = this.axiosAdapter.getInvgate<Promise<Country[]>>(
      `${this.url_api}/locations`,
    );
    return data;
  }

  async getIncidentsForAgent(idAgent: number) {
    const data = await this.axiosAdapter.getInvgate<Promise<RequestData>>(
      `${this.url_api}/incidents.by.agent?id=${idAgent}`,
    );
    return Object.values(data.requests);
  }

  async getIncidentById(id: number) {
    try {
      const data = await this.axiosAdapter.getInvgate<Promise<Array<Incident>>>(
        `${this.url_api}/incidents?ids[]=${id}`,
      );
      return Object.values(data)[0];
    } catch (error) {
      console.log(error);
    }
  }
}
