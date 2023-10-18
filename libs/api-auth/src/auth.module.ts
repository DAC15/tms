import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfig } from '@tms/api-config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ApiConfig.auth.accessTokenSecret,
      signOptions: { expiresIn: ApiConfig.auth.accessTokenExpire },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
