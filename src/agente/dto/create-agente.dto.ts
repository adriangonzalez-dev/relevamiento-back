import { IsNumber, IsString } from 'class-validator';

export class CreateAgenteDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  role: number;
}
