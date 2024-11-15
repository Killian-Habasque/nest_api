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

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  label: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @ApiProperty({ type: () => Tag, isArray: true })
  @ManyToMany(() => Tag, (tag) => tag.categories)
  @JoinTable()
  tags: Tag[];

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
