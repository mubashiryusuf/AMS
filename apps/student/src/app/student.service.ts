import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  async signup(body: any) {
    console.log('STUDENT SERVICE >>>', body);
    return 'signup successfully';
  }
}
