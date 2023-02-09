import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { logInDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() signUp: signUpDto,
  ): Promise<{ token: string; user: any }> {
    return this.authService.signUp(signUp);
  }

  @Get('login')
  async loginIn(
    @Body() loginIn: logInDto,
  ): Promise<{ token: string; user: any }> {
    return this.authService.logIn(loginIn);
  }
}
