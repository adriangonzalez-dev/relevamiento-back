import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapter/http-adapter';
import { GoogleAPIAdapter } from './adapter/google-adapter';

@Module({
  providers: [AxiosAdapter, GoogleAPIAdapter],
  exports: [AxiosAdapter, GoogleAPIAdapter],
})
export class CommonModule {}
