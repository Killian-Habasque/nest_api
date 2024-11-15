// import { Injectable } from '@nestjs/common';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

// @Injectable()
// export class CategoriesService {
//   create(createCategoryDto: CreateCategoryDto) {
//     return 'This action adds a new category';
//   }

//   findAll() {
//     return `This action returns all categories`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} category`;
//   }

//   update(id: number, updateCategoryDto: UpdateCategoryDto) {
//     return `This action updates a #${id} category`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} category`;
//   }
// }

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: number,
  ): Promise<Category> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });

    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['user'] });
  }

  async findOne(id: number, userId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['user'],
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
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to update this category.",
      );
    }

    await this.categoryRepository.update(id, updateCategoryDto);
    return this.categoryRepository.findOne({ where: { id } });
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
