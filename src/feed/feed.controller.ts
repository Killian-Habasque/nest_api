import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { TagsService } from 'src/tags/tags.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('feed')
@ApiTags('Feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly tagsService: TagsService,
    private readonly categoriesService: CategoriesService,
  ) { }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  async searchByTags(
    @Request() req,
    @Query('maxResults') maxResults: string = '10',
  ) {
    const userId = req.user.sub;

    const parsedMaxResults = parseInt(maxResults, 10);
    if (isNaN(parsedMaxResults)) {
      throw new Error('Invalid maxResults parameter. It must be a number.');
    }

    const tags = await this.tagsService.findAll(userId);
    const tagsArray = tags.map(tag => tag.label);

    return this.feedService.searchByTags(tagsArray, parsedMaxResults);
  }

  @UseGuards(AuthGuard)
  @Get(':categoryId')
  @ApiBearerAuth()
  async searchByCategory(
    @Request() req,
    @Param('categoryId') categoryId: number,
    @Query('maxResults') maxResults: string = '10',
  ) {
    const userId = req.user.sub;

    const parsedMaxResults = parseInt(maxResults, 10);
    if (isNaN(parsedMaxResults)) {
      throw new Error('Invalid maxResults parameter. It must be a number.');
    }

    const category = await this.categoriesService.findOne(
      categoryId,
      userId,
    );
    if (!category) {
      throw new Error('Category not found or does not belong to the user');
    }

    const tagsArray = category.tags.map(tag => tag.label);

    return this.feedService.searchByTags(tagsArray, parsedMaxResults);
  }
}
