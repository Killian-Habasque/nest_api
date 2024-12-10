import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "src/tags/entities/tag.entity";
import { IsString, IsOptional, IsArray, IsInt, Matches, IsNotEmpty } from "class-validator";


export class CreateCategoryDto {
  @ApiProperty({
    description: 'Label de la catégorie',
    example: 'Code'
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Slug de la catégorie',
    example: 'code'
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Le slug doit être en minuscules et ne contenir que des lettres, chiffres et tirets'
  })
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    type: [Number],
    required: false,
    description: 'Tags liés à la catégorie',
    example: [1, 2, 3]
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: Tag[];
}
