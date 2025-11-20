import { Body, Controller,  Get,  Post } from '@nestjs/common';
import { GatewayService } from '../gateway.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto, LoginDto } from '@shared';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  async signup(@Body() body: RegisterDto) {
    return this.gatewayService.signup(body);
  }

  @Get('login')
  async login(@Body() body: LoginDto) {
    return this.gatewayService.login(body);
  }
}
