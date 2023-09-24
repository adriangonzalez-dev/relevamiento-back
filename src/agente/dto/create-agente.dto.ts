import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAgenteDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
