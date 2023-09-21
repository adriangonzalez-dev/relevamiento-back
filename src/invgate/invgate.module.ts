import { Module } from '@nestjs/common';
import { InvgateService } from './invgate.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [InvgateService],
  exports: [InvgateService],
  imports: [CommonModule],
})
export class InvgateModule {}
