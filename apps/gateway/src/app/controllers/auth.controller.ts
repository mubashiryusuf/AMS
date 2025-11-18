import { Body, Controller,  Post } from '@nestjs/common';
import { GatewayService } from '../gateway.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    return this.gatewayService.signup(body);
  }
}
