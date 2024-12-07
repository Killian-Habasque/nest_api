import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotUniqueException } from '../exception/NotUniqueException';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      await this.userRepository.exist({
        where: { username: createUserDto.username },
      })
    ) {
      throw new NotUniqueException('A user with this username already exists');
    }
    const saltOrRounds = 10;
    const password = createUserDto.password;
    createUserDto.password = await bcrypt.hash(password, saltOrRounds);

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.insert(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    const userExists = await this.userRepository.exist({ where: { id } });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
}
