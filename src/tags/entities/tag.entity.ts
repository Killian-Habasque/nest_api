/* eslint-disable prettier/prettier */
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
import { Category } from 'src/categories/entities/category.entity';
  
  @Entity()
  export class Tag {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ApiProperty()
    @Column({ length: 150 })
    label: string;
  
    @ApiProperty()
    @Column({ length: 150 })
    slug: string;
  
    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.tags, { nullable: false })
    user: User;
  
    @ApiProperty({ type: () => Category, isArray: true })
    @ManyToMany(() => Category, (category) => category.tags)
    categories: Category[];

    constructor(partial: Partial<Tag>) {
      Object.assign(this, partial);
    }
  }
  