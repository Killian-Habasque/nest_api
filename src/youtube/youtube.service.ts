import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeService {
  private readonly apiKey: string;
  private readonly youtubeApiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
    this.youtubeApiUrl = 'https://www.googleapis.com/youtube/v3';
  }

  async searchByTags(tags: string[], maxResults: number = 5): Promise<any> {
    const query = tags.join(' ');
    const url = `${this.youtubeApiUrl}/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&maxResults=${maxResults}&key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.items.map((item) => ({
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        description: item.snippet.description,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle,
      }));
    } catch (error) {
      throw new Error(`Failed to fetch videos from YouTube: ${error.message}`);
    }
  }
}
