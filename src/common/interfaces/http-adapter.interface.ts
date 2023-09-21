import { AxiosRequestConfig } from 'axios';

export interface HttpAdapter {
  getInvgate<T>(url: string, config: AxiosRequestConfig): Promise<T>;
}
