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
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard) 
  @Get('/me')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Current user information retrieved successfully.',
    type: User,
  })
  async getMe(@Request() req): Promise<User> {
    const userId = req.user.sub; 
    return this.usersService.findOneById(userId);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'All users retrieved successfully.',
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
  @ApiCreatedResponse({
    description: 'User updated successfully.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(+id);
  }
}
