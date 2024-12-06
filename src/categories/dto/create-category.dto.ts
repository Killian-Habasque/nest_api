import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "src/tags/entities/tag.entity";
import { IsString, IsOptional, IsArray, IsInt } from "class-validator";


export class CreateCategoryDto {
  @IsString()
  label: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true }) 
  @ApiProperty({ type: [Number], required: false })
  tags?: Tag[];
}
