import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './auth/AuthMetadata';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  @Public()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('config')
  @Public()
  getConfig(): object {
    return {
      port: this.configService.get<object>('port'),
    };
  }
}
