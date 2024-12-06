import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Exclude, Expose } from 'class-transformer';

export const GROUP_CATEGORY = 'group_category_details';
export const GROUP_ALL_CATEGORIES = 'group_all_categories';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  label: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_CATEGORY] })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_CATEGORY] })
  updatedAt: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.categories)
  @Exclude()
  user: User;

  @ApiProperty({ type: () => Tag, isArray: true })
  @ManyToMany(() => Tag, (tag) => tag.categories)
  @JoinTable()
  @Expose({ groups: [GROUP_CATEGORY] })
  tags: Tag[];

  @ApiProperty()
  @Expose({ groups: [GROUP_CATEGORY] })
  slug: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
