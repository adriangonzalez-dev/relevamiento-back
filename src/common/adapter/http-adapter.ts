import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios;
  }

  async getInvgate<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(
            `${process.env.USER_INVGATE}:${process.env.PASSWORD_INVGATE}`,
          )}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  }
}
