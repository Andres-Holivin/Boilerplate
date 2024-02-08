import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from '../environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<IEnvironment>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.access_sercret', {
        infer: true,
      }),
    });
  }

  validate(payload: any) {
    console.log('payload', payload.user);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
