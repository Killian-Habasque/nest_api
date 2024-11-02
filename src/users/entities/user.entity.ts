import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  username: string;

  @Exclude()
  @Column({ length: 150, default: null })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
