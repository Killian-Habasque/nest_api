import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [ConfigModule, TagsModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}