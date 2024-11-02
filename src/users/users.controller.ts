import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
    isArray: true,
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Put(':id')
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiTags('Users')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return;
  }
}
