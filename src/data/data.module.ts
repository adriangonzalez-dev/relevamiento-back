import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { InvgateModule } from 'src/invgate/invgate.module';

@Module({
  controllers: [DataController],
  providers: [DataService],
  imports: [InvgateModule],
})
export class DataModule {}
