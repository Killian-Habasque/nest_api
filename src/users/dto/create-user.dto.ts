import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    description: "Nom d'utilisateur unique", 
    example: 'john_doe' 
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, { 
    message: 'Le nom d\'utilisateur peut contenir uniquement des lettres, chiffres et underscores' 
  })
  username: string;

  @ApiProperty({ 
    description: "Mot de passe de l'utilisateur", 
    example: 'fjsdf7dskdsqkjd' 
  })
  @IsString()
  password: string;

  @ApiProperty({ 
    description: "Nom d'utilisateur GitHub", 
    example: 'github_user', 
    required: false 
  })
  @IsString() 
  @IsOptional()
  githubname?: string;
}
