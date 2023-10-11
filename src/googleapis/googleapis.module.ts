import { Module } from '@nestjs/common';
import { GoogleapisService } from './googleapis.service';
import { GoogleapisController } from './googleapis.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [GoogleapisController],
  providers: [GoogleapisService],
  imports: [CommonModule],
})
export class GoogleapisModule {}
