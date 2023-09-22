import { Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { InvgateService } from 'src/invgate/invgate.service';

@Injectable()
export class DataService {
  constructor(private readonly invgateService: InvgateService) {}

  create(createDatumDto: CreateDataDto) {
    return createDatumDto;
  }

  async findAll(): Promise<any> {
    try {
      return await this.invgateService.getAllLocations();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    id;
  }

  update(id: number, updateDatumDto: UpdateDataDto) {
    return updateDatumDto;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }
}
