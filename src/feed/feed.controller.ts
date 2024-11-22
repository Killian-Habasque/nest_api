import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { TagsService } from 'src/tags/tags.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('feed')
@ApiTags('Feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly tagsService: TagsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  async searchByTags(
    @Request() req,
    @Query('maxResults') maxResults: number = 10,
  ) {
    const userId = req.user.sub;

    const tags = await this.tagsService.findAll(userId);

    const tagsArray = tags.map(tag => tag.label);

    return this.feedService.searchByTags(tagsArray, maxResults);
  }
}

