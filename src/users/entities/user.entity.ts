import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity()
@Unique(['username'])
export class User {
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  username: string;

  @Exclude()
  @Column({ length: 150, default: null })
  password: string;

  @OneToMany(() => Tag, (website) => website.user)
  websites: Tag[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
