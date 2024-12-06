import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category, GROUP_CATEGORY } from 'src/categories/entities/category.entity';
import { Exclude, Expose } from 'class-transformer';

export const GROUP_TAG = 'group_tag_details';
export const GROUP_ALL_TAGS = 'group_all_tags';

@Entity()
export class Tag {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY] })
  id: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_TAG] })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_TAG] })
  updatedAt: Date;

  @ApiProperty()
  @Column({ length: 150 })
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY] })
  label: string;

  @ApiProperty()
  @Column({ length: 150 })
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY] })
  slug: string;

  @Exclude()
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.tags, { nullable: false })
  user: User;

  @Exclude()
  @ApiProperty({ type: () => Category, isArray: true })
  @ManyToMany(() => Category, (category) => category.tags)
  categories: Category[];

  constructor(partial: Partial<Tag>) {
    Object.assign(this, partial);
  }
}
