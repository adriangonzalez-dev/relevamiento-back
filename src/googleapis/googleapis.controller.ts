import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { GoogleapisService } from './googleapis.service';

@Controller('googleapis')
export class GoogleapisController {
  constructor(private readonly googleapisService: GoogleapisService) {}

  @Post()
  create() {
    return this.googleapisService.create();
  }

  @Get('tickets')
  getDataTickets() {
    /* return this.googleapisService.getDataAudit(); */
    return this.googleapisService.getDataLvl1();
  }

  @Get('audits')
  getDataAudits() {
    return this.googleapisService.getDataAudit();
  }

  @Get('params')
  getParams() {
    return this.googleapisService.getParamsData();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googleapisService.remove(+id);
  }
}
