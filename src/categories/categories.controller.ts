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

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly websitesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Category created successfully and linked to the user.',
    type: Category,
  })
  async create(@Body() createWebsiteDto: CreateCategoryDto, @Request() req) {
    const userId = req.user.sub;
    return this.websitesService.create(createWebsiteDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Category> {
    const userId = req.user.sub;
    return this.websitesService.findOne(+id, userId);
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
    @Body() updateWebsiteDto: UpdateCategoryDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.websitesService.update(+id, updateWebsiteDto, userId);
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
    return this.websitesService.remove(+id, userId);
  }
}
