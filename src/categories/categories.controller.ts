import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Tag } from 'src/tags/entities/tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Request() req,
  ): Promise<Category[]> {
    const userId = req.user.sub;
    return this.CategoriesService.findAll(userId);
  }
  
  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Category created successfully and linked to the user.',
    type: Category,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const userId = req.user.sub;

    const foundTags = await this.tagRepository.findBy({
      id: In(createCategoryDto.tags),
    });

    return this.CategoriesService.create(createCategoryDto, userId, foundTags);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Category> {
    const userId = req.user.sub;
    return this.CategoriesService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Category updated successfully.',
    type: Category,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    const tags: Tag[] = updateCategoryDto.tags;
    return this.CategoriesService.update(+id, updateCategoryDto, userId, tags);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Category deleted successfully.',
    type: Category,
  })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.CategoriesService.remove(+id, userId);
  }
}
