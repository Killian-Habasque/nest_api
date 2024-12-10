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
  @ApiProperty({
    description: "Date de création de l'utilisateur",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_USER] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour de l'utilisateur",
    example: '2023-10-05T14:00:00Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_USER] })
  updatedAt: Date;

  @ApiProperty({
    description: "Identifiant unique de l'utilisateur",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  id: number;

  @ApiProperty({
    description: "Nom d'utilisateur unique",
    example: 'john_doe'
  })
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  username: string;

  @ApiProperty({
    description: "Nom d'utilisateur GitHub",
    example: 'github_user',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  githubname: string;

  @Exclude()
  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'fjsdf7dskdsqkjd'
  })
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
