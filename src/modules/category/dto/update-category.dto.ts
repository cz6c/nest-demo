import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IdDto } from '@/common/common.dto';

export class UpdateCategoryDto extends IntersectionType(
  IdDto,
  PartialType(CreateCategoryDto),
) {}
