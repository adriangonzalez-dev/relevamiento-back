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
  solved_at: string;
  description: string;
  date_ocurred: string;
  closed_reason: number;
  assigned_id: number;
  sla_incident_resolution: string;
  user_id: number;
  creator_id: number;
  category_id: number;
  created_at: string;
  pretty_id: string;
  last_update: string;
  priority_id: number;
  closed_at: string;
  title: string;
  attachments: number[]; // Array with IDs of the attachments
  status_id: number;
  process_id: number;
  id: number; // Request ID
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

  async getAllCategories() {
    const data = this.axiosAdapter.getInvgate(`${this.url_api}/categories`);
    return data;
  }

  async getAllTypes() {
    const data = this.axiosAdapter.getInvgate(
      `${this.url_api}/incident.attributes.type`,
    );
    return data;
  }

  async getIncidentsForAgent(idAgent: number) {
    const data = await this.axiosAdapter.getInvgate<Promise<RequestData>>(
      `${this.url_api}/incidents.by.agent?id=${idAgent}`,
    );
    return Object.values(data.requests);
  }

  async checkingClosedIncident() {
    /* Una vez que se tenga la db se deberian buscar en la db los incidentes con closed_at = null,
     buscarlos en invgate y verificar si ya fueron cerrados, y actualizarlos en la db*/
  }
}
