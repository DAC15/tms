import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '@tms/api-auth';
import { UserEntity } from '@tms/api-database';
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthTokenResponseDto,
  JwtUser,
  MyUserDto,
} from '@tms/shared-models';
import { hashPassword, normalizeEmail } from '@tms/shared-utils';

@Injectable()
export class AuthApiService {
  constructor(private readonly _authService: AuthService) {}

  public async register(dto: AuthRegisterDto): Promise<AuthTokenResponseDto> {
    const existing = await UserEntity.findOne({
      where: { email: normalizeEmail(dto.email) },
    });
    if (existing) {
      throw new NotAcceptableException('User with this email already exists');
    }

    const user = await UserEntity.save(
      UserEntity.create({
        fullName: dto.fullName,
        email: normalizeEmail(dto.email),
        password: await hashPassword(dto.password),
      })
    );

    return this._authService.getTokenResponse(user.id);
  }

  public async login(dto: AuthLoginDto): Promise<AuthTokenResponseDto> {
    const user = await UserEntity.findOne({
      where: { email: normalizeEmail(dto.email) },
      select: { id: true, password: true },
    });
    if (!user || !user.validatePassword(dto.password)) {
      throw new NotFoundException('User not found by these credentials');
    }

    return this._authService.getTokenResponse(user.id);
  }

  public async getMe(jwtUser: JwtUser): Promise<MyUserDto> {
    const user = await UserEntity.findOne({
      where: { id: jwtUser.uid },
      select: { id: true, fullName: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { fullName: user.fullName };
  }
}
