import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ApiConfig } from '@tms/api-config';
import { JwtUser } from '@tms/shared-models';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ApiConfig.auth.accessTokenSecret,
    });
  }

  validate(jwtUser: JwtUser): JwtUser {
    return jwtUser;
  }
}
