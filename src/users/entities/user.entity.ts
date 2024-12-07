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
import { Exclude, Expose } from 'class-transformer';
import { Tag } from 'src/tags/entities/tag.entity';
import { Category } from 'src/categories/entities/category.entity';

export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USERS = 'group_all_users';

@Entity()
@Unique(['username'])
export class User {
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_USER] })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_USER] })
  updatedAt: Date;

  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  username: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  githubname: string;

  @Exclude()
  @Column({ length: 150, default: null })
  password: string;

  @Exclude()
  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @Exclude()
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
