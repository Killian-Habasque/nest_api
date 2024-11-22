import { Controller, Get, Query, Request } from '@nestjs/common';
import { FeedService } from './feed.service';
import { TagsService } from 'src/tags/tags.service';
@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly tagsService: TagsService,
  ) {}

  @Get('')
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

