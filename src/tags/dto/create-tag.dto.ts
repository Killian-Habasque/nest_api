import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Label de tag',
    example: 'Nestjs'
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Slug de tag',
    example: 'nestjs'
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Le slug doit être en minuscules et ne contenir que des lettres, chiffres et tirets'
  })
  @IsNotEmpty()
  slug: string;
}
