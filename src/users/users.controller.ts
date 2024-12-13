import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  SerializeOptions,
  Patch,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GROUP_USER, User } from './entities/user.entity';
// import { GROUP_ALL_USERS } from './entities/user.entity';
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
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  async getMe(@Request() req): Promise<User> {
    const userId = req.user.sub; 
    return this.usersService.findOneById(userId);
  }

  // ADMIN REQUEST
  // @Get()
  // @ApiCreatedResponse({
  //   description: 'All users retrieved successfully.',
  //   type: User,
  //   isArray: true,
  // })
  // @SerializeOptions({
  //   groups: [GROUP_ALL_USERS],
  // })
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  // ADMIN REQUEST
  // @Get(':id') 
  // @ApiCreatedResponse({
  //   description: 'User retrieved successfully.',
  //   type: User,
  // })
  // @SerializeOptions({
  //   groups: [GROUP_USER],
  // })
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOneById(+id); 
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'User updated successfully.',
    type: User,
  })
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @Request() req
  ): Promise<User> {
    const currentUserId = req.user.sub;
    return this.usersService.update(+id, updateUserDto, currentUserId);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'User deleted successfully',
  })
  async remove(@Param('id') id: string, @Request() req): Promise<{ message: string }> {
    const currentUserId = req.user.sub;
    try {
      await this.usersService.remove(+id, currentUserId);
      return { message: 'User deleted successfully' }; 
    } catch (error) {
      throw new HttpException('Failed to delete user', error); 
    }
  }
}
