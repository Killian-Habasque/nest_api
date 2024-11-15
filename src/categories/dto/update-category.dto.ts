import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { Tag } from 'src/tags/entities/tag.entity';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  label: string;
  slug: string;
  
  @ApiProperty({ type: () => [Tag], required: false })
  tags: Tag[];
}
