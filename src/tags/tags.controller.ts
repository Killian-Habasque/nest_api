import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly websitesService: TagsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag created successfully and linked to the user.',
    type: Tag,
  })
  async create(@Body() createWebsiteDto: CreateTagDto, @Request() req) {
    const userId = req.user.sub;
    return this.websitesService.create(createWebsiteDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Tag> {
    const userId = req.user.sub;
    return this.websitesService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag updated successfully.',
    type: Tag,
  })
  async update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateTagDto, @Request() req) {
    const userId = req.user.sub;
    return this.websitesService.update(+id, updateWebsiteDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag deleted successfully.',
    type: Tag,
  })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.websitesService.remove(+id, userId);
  }
}
