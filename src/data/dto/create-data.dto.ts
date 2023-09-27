import { IsNumber, IsString } from 'class-validator';

export class CreateDataDto {
  @IsNumber()
  agent: number;

  @IsString()
  request: string;

  @IsNumber()
  type: number;

  @IsNumber()
  country: number;

  @IsNumber()
  request_date: number;

  @IsNumber()
  implementation_date: number;

  @IsNumber()
  segment: number;

  @IsNumber()
  via: number;
}
