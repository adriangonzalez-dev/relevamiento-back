import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InvgateService } from 'src/invgate/invgate.service';

@Injectable()
export class DataService {
  constructor(private readonly invgateService: InvgateService) {}

  create(createDatumDto: CreateDatumDto) {
    return createDatumDto;
  }

  async findAll(): Promise<any> {
    try {
      return await this.invgateService.getAllInfoInvgate();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    
  }

  update(id: number, updateDatumDto: UpdateDatumDto) {
    return updateDatumDto;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }
}
