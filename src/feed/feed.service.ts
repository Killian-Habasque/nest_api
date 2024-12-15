import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeedService {
  private readonly apiKey: string;
  private readonly youtubeApiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
    this.youtubeApiUrl = 'https://www.googleapis.com/youtube/v3';
  }

  async searchByTags(tags: string[], maxResults: number = 5, pageToken?: string): Promise<any> {
    const query = tags.join(' ');
    const searchUrl = `${this.youtubeApiUrl}/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&maxResults=${maxResults}&key=${this.apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`;

    try {
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.statusText}`);
      }

      const data = await response.json();

      const channelIds = [...new Set(data.items.map((item) => item.snippet.channelId))];

      const channelsUrl = `${this.youtubeApiUrl}/channels?part=snippet&id=${channelIds.join(
        ',',
      )}&key=${this.apiKey}`;
      const channelResponse = await fetch(channelsUrl);
      if (!channelResponse.ok) {
        throw new Error(`YouTube API Error: ${channelResponse.statusText}`);
      }

      const channelData = await channelResponse.json();

      const channelDetails = channelData.items.reduce((acc, channel) => {
        acc[channel.id] = {
          avatar: channel.snippet.thumbnails.medium.url,
          url: `https://www.youtube.com/channel/${channel.id}`,
        };
        return acc;
      }, {});

      return {
        items: data.items.map((item) => ({
          id: item.id,
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          description: item.snippet.description,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: {
            title: item.snippet.channelTitle,
            avatar: channelDetails[item.snippet.channelId]?.avatar,
            url: channelDetails[item.snippet.channelId]?.url,
          },
        })),
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
      };
    } catch (error) {
      throw new Error(`Failed to fetch videos from YouTube: ${error.message}`);
    }
  }
}
