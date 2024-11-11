import { Module } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Website]),
    UsersModule
  ],
  controllers: [WebsitesController],
  providers: [WebsitesService],
  exports: [WebsitesService, TypeOrmModule],
})
export class WebsitesModule { }
