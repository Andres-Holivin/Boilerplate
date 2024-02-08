import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IEnvironment } from '../environment';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService<IEnvironment>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.refresh_secret', { infer: true }),
    });
  }

  public validate(payload: any): any {
    console.log('jwt refresh ', payload);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
