import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IEnvironment } from '../environment';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class EncryptService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<IEnvironment>,
  ) {}
  async generateRefreshToken(user: UserModel): Promise<string> {
    user.password = '';
    const refreshToken = await this.jwtService.signAsync(
      { user },
      {
        secret: this.configService.getOrThrow('jwt.refresh_secret', {
          infer: true,
        }),
      },
    );
    return refreshToken;
  }
  async generateAccessToken(user: UserModel): Promise<string> {
    user.password = '';
    const accessToken = await this.jwtService.signAsync(
      { user },
      {
        secret: this.configService.getOrThrow('jwt.access_sercret', {
          infer: true,
        }),
        expiresIn: '1h',
      },
    );
    return accessToken;
  }
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 20);
  }
  checkPassword(encryptPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, encryptPassword);
  }
}
