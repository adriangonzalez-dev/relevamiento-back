import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [],
  providers: [ScheduleService],
  imports: [DataModule],
})
export class ScheduleModule {}
