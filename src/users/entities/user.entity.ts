import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Website } from 'src/websites/entities/website.entity';

@Entity()
@Unique(['username'])
export class User {

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
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

  @OneToMany(() => Website, website => website.user)
  websites: Website[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}