import { PartialType } from '@nestjs/mapped-types';
import { CreateViaSolicitudDto } from './create-via_solicitud.dto';

export class UpdateViaSolicitudDto extends PartialType(CreateViaSolicitudDto) {}
