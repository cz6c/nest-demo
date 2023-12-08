import { IntersectionType, PartialType } from '@nestjs/swagger';
import { IdDto } from '@/common/common.dto';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends IntersectionType(
  IdDto,
  PartialType(CreateTagDto),
) {}
