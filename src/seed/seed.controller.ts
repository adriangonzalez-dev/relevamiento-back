import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async seedDB() {
    try {
      const response = await this.seedService.seedDB();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
