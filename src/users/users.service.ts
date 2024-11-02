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
      await this.userRepository.exists({
        where: { username: createUserDto.username },
      })
    ) {
      throw new NotUniqueException('A user with this username already exist');
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

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    if (!(await this.userRepository.exists({ where: { id: id } }))) {
      throw new NotFoundException();
    }
    return this.userRepository.delete(id);
  }
}
