import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search')
  async searchByTags(
    @Query('tags') tags: string,
    @Query('maxResults') maxResults: number = 5,
  ) {
    const tagsArray = tags.split(',');
    return this.youtubeService.searchByTags(tagsArray, maxResults);
  }
}
