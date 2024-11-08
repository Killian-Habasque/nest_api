import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Keyword } from 'src/keywords/entities/keyword.entity';

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

  @OneToMany(() => Keyword, (keyword) => keyword.user)
  keywords: Keyword[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
