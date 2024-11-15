import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from 'src/users/entities/user.entity';
  import { ApiProperty } from '@nestjs/swagger';
  
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
    @ManyToOne(() => User, (user) => user.websites, { nullable: false })
    user: User;
  
    constructor(partial: Partial<Tag>) {
      Object.assign(this, partial);
    }
  }
  