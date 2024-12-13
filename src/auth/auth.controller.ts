import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, Auth } from './auth.service';
import { Public } from './AuthMetadata';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GROUP_USER, User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @ApiTags('Auth')
  @ApiCreatedResponse({
    description: 'Login on app',
    type: Auth,
  })
  @Post('auth/login')
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  async login(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('auth/register')
  @Public()
  @ApiTags('Auth')
  @ApiCreatedResponse({
    description: 'Register on app',
    type: User,
  })
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user as User;
  }
}
