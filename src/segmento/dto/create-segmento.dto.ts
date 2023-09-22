import { IsString } from 'class-validator';

export class CreateSegmentoDto {
  @IsString()
  name: string;
}
