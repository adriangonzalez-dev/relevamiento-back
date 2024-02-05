import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  constructor(private readonly dataService: DataService) {}

  @Cron(CronExpression.EVERY_12_HOURS) // Ejecuta la tarea cada hora (puedes ajustar la programación según tus necesidades)
  async handleCron() {
    try {
      /* await this.dataService.updateDB(); */
      console.log('Actualizacion desde api desactivada...');
    } catch (error) {
      console.log(error);
    }
  }
}
