import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "src/tags/entities/tag.entity";

export class CreateCategoryDto {
  label: string;
  slug: string;

  @ApiProperty({ type: () => [Tag], required: false })
  tags: Tag[]; 
}
