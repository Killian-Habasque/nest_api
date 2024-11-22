import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search')
  async searchVideos(
    @Query('query') query: string,
    @Query('maxResults') maxResults: string,
  ) {
    const results = await this.youtubeService.searchVideos(
      query,
      Number(maxResults) || 5,
    );
    return {
      success: true,
      data: results,
    };
  }
}
