import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Label for the tag',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Slug for the tag, usually derived from the label',
    example: 'technology',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
