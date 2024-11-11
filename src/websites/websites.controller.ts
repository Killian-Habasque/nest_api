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
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Website } from './entities/website.entity';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('websites')
@ApiTags('Websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Website created successfully and linked to the user.',
    type: Website,
  })
  async create(@Body() createWebsiteDto: CreateWebsiteDto, @Request() req) {
    const userId = req.user.sub;
    return this.websitesService.create(createWebsiteDto, userId);
  }

  @Get()
  findAll(): Promise<Website[]> {
    return this.websitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Website> {
    return this.websitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websitesService.update(+id, updateWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.websitesService.remove(+id);
  }
}
