import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from 'src/tags/tags.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [ConfigModule, TagsModule, CategoriesModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule { }