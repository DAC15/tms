import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@tms/api-database';
import { AuthTokenResponseDto, JwtUser } from '@tms/shared-models';

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService) {}

  public async getTokenResponse(userId: number): Promise<AuthTokenResponseDto> {
    const user = await UserEntity.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      accessToken: this._jwtService.sign(<JwtUser>{ uid: user.id }),
    };
  }
}
