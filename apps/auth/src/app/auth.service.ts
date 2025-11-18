import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup(body: any) {
    console.log('AUTH SERVICE >>>', body);
    return 'signup successfully';
  }
}
