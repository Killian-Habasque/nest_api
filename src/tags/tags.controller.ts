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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { PresenterTagDto } from './dto/presenter-tag.dto';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly websitesService: TagsService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag created successfully and linked to the user.',
    type: PresenterTagDto,
  })
  async create(
    @Body() createWebsiteDto: CreateTagDto,
    @Request() req,
  ): Promise<PresenterTagDto> {
    const userId = req.user.sub;
    const createdTag = await this.websitesService.create(createWebsiteDto, userId);
    return plainToInstance(PresenterTagDto, createdTag, { excludeExtraneousValues: true });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag retrieved successfully.',
    type: PresenterTagDto,
  })
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<PresenterTagDto> {
    const userId = req.user.sub;
    const tag = await this.websitesService.findOne(+id, userId);
    return plainToInstance(PresenterTagDto, tag, { excludeExtraneousValues: true });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag updated successfully.',
    type: PresenterTagDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateWebsiteDto: UpdateTagDto,
    @Request() req,
  ): Promise<PresenterTagDto> {
    const userId = req.user.sub;
    const updatedTag = await this.websitesService.update(+id, updateWebsiteDto, userId);
    return plainToInstance(PresenterTagDto, updatedTag, { excludeExtraneousValues: true });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag deleted successfully.',
    type: PresenterTagDto,
  })
  async remove(
    @Param('id') id: string,
    @Request() req,
  ): Promise<PresenterTagDto> {
    const userId = req.user.sub;
    const deletedTag = await this.websitesService.remove(+id, userId);
    return plainToInstance(PresenterTagDto, deletedTag, { excludeExtraneousValues: true });
  }
}
