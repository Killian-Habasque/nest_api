import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeService {
  private readonly apiKey: string;
  private readonly youtubeApiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
    this.youtubeApiUrl = 'https://www.googleapis.com/youtube/v3';
  }

  async searchVideos(query: string, maxResults: number = 5): Promise<any> {
    const url = `${this.youtubeApiUrl}/search?part=snippet&q=${query}&maxResults=${maxResults}&key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new HttpException(
          `Failed to fetch data from YouTube API: ${response.statusText}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await response.json();
      return data.items.map((item) => ({
        title: item.snippet.title,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
    } catch (error) {
      throw new HttpException(
        'An error occurred while fetching videos from YouTube',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
