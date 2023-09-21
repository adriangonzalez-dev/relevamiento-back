import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapter/http-adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
