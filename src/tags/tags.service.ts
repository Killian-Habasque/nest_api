import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTagDto: CreateTagDto, userId: number): Promise<Tag> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tag = this.tagRepository.create({
      ...createTagDto,
      user,
    });

    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find({ relations: ['user'] });
  }

  async findOne(id: number, userId: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to view this tag.");
    }

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto, userId: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id }, relations: ['user'] });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to update this tag.");
    }

    await this.tagRepository.update(id, updateTagDto);
    return this.tagRepository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number): Promise<void> {
    const tag = await this.tagRepository.findOne({ where: { id }, relations: ['user'] });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    if (tag.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to delete this tag.");
    }

    await this.tagRepository.delete(id);
  }
}
