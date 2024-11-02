import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      name: 'Hello World!',
      doc: 'url to the document',
    };
  }
}
