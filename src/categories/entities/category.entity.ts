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
  @ApiProperty({
    description: "Identifiant unique de la catégorie",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  id: number;

  @ApiProperty({
    description: 'Label de la catégorie',
    example: 'Code'
  })
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  label: string;

  @ApiProperty({
    description: "Date de création de la catégorie",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_CATEGORY] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour de la catégorie",
    example: '2023-10-05T14:00:00Z',
  })  
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_CATEGORY] })
  updatedAt: Date;

  @ApiProperty({
    description: 'Slug de la catégorie',
    example: 'code'
  })
  @Expose({ groups: [GROUP_CATEGORY] })
  slug: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.categories)
  @Exclude()
  user: User;

  @ApiProperty({ type: () => Tag, isArray: true })
  @ManyToMany(() => Tag, (tag) => tag.categories)
  @JoinTable()
  @Expose({ groups: [GROUP_CATEGORY] })
  tags: Tag[];

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
