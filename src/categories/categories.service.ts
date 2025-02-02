import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) { }


  async create(createCategoryDto: CreateCategoryDto, userId: number, tags: Tag[]): Promise<Category> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userTags = await this.tagRepository.find({
      where: {
        id: In(createCategoryDto.tags),
        user: { id: userId },
      },
    });

    if (userTags.length !== createCategoryDto.tags.length) {
      throw new ForbiddenException('One or more tags not found or do not belong to the user');
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      user,
      tags: userTags,
    });

    return this.categoryRepository.save(category);
  }


  async findAll(userId: number): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'tags'],
    });
  }

  async findOne(id: number, userId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['user', 'tags'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to view this category.",
      );
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    userId: number,
    tags: Tag[],
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['user', 'tags'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to update this category.",
      );
    }

    const userTags = await this.tagRepository.find({
      where: {
        id: In(tags.map((tag) => tag.id)),
        user: { id: userId },
      },
    });

    if (userTags.length !== tags.length) {
      throw new NotFoundException('One or more tags not found or do not belong to the user');
    }

    category.label = updateCategoryDto.label;
    category.slug = updateCategoryDto.slug;
    category.tags = userTags;

    return this.categoryRepository.save(category);
  }


  async remove(id: number, userId: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to delete this category.",
      );
    }

    await this.categoryRepository.delete(id);
  }
}
