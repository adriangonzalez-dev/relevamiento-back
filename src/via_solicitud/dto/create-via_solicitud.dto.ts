import { IsString } from 'class-validator';

export class CreateViaSolicitudDto {
  @IsString()
  name: string;
}
