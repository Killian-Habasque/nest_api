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
  @ApiProperty({
    description: "Identifiant unique du tag",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY] })
  id: number;

  @ApiProperty({
    description: "Date de création du tag",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_TAG] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour du tag",
    example: '2023-10-05T14:00:00Z',
  })  
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_TAG] })
  updatedAt: Date;

  @ApiProperty({
    description: 'Label de tag',
    example: 'Nestjs'
  })
  @Column({ length: 150 })
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY] })
  label: string;

  @ApiProperty({
    description: 'Slug de tag',
    example: 'nestjs'
  })
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
