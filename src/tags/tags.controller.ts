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
  SerializeOptions,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
// import { PresenterTagDto } from './dto/presenter-tag.dto';
// import { plainToInstance } from 'class-transformer';
import { GROUP_ALL_TAGS, GROUP_TAG, Tag } from './entities/tag.entity';
import { UsersService } from '../users/users.service';
import { GROUP_ALL_CATEGORIES, GROUP_CATEGORY } from 'src/categories/entities/category.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly apiService: TagsService,
    private readonly usersService: UsersService, 
  ) { }

  @UseGuards(AuthGuard)
  @Get('github-topics')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'GitHub topics retrieved successfully.',
    type: [String],
  })
  async getGithubTopics(
    @Request() req,
  ): Promise<string[]> {
    const userId = req.user.sub;
    const user = await this.usersService.findOneById(userId);
    return this.apiService.getGithubTopics(user.githubname);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tags retrieved successfully.',
    type: Tag,
  })
  @SerializeOptions({
    groups: [GROUP_ALL_TAGS, GROUP_ALL_CATEGORIES],
  })
  async findAll(
    @Request() req,
  ): Promise<Tag[]> {
    const userId = req.user.sub;

    return this.apiService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag created successfully and linked to the user.',
    type: Tag,
  })
  @SerializeOptions({
    groups: [GROUP_TAG],
  })
  async create(
    @Body() createTagDto: CreateTagDto,
    @Request() req,
  ): Promise<Tag> {
    const userId = req.user.sub;
    return this.apiService.create(createTagDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag retrieved successfully.',
    type: Tag,
  })
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY],
  })
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Tag> {
    const userId = req.user.sub;
    return this.apiService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Tag updated successfully.',
    type: Tag,
  })
  @SerializeOptions({
    groups: [GROUP_TAG],
  })
  async update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @Request() req,
  ): Promise<Tag> {
    const userId = req.user.sub;
    return this.apiService.update(+id, updateTagDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @SerializeOptions({
    groups: [GROUP_TAG],
  })
  @ApiCreatedResponse({
    description: 'Category deleted successfully.',
    type: Tag,
  })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.apiService.remove(+id, userId);
  }


}
