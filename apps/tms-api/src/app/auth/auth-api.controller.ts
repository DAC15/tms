import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, JwtAuthGuard } from '@tms/api-auth';
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthTokenResponseDto,
  JwtUser,
  MyUserDto,
} from '@tms/shared-models';
import { AuthApiService } from './auth-api.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthApiController {
  constructor(private readonly _service: AuthApiService) {}

  @Post('register')
  public register(@Body() dto: AuthRegisterDto): Promise<AuthTokenResponseDto> {
    return this._service.register(dto);
  }

  @Post('login')
  public login(@Body() dto: AuthLoginDto): Promise<AuthTokenResponseDto> {
    return this._service.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public getMe(@AuthUser() jwtUser: JwtUser): Promise<MyUserDto> {
    return this._service.getMe(jwtUser);
  }
}
