import { PartialType } from '@nestjs/swagger';
import { CreateChangestrackingDto } from './create-changestracking.dto';

export class UpdateChangestrackingDto extends PartialType(CreateChangestrackingDto) {}
