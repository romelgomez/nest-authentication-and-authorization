import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/access-token')
  async sign() {
    return this.authService.sign();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/private')
  async private() {
    return {
      message: 'This is a private route',
    };
  }
}
