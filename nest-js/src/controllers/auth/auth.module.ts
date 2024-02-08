import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/utils/helper/helper.module';
import { JwtStrategy } from 'src/utils/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from 'src/utils/jwt/jwt-refresh';

@Module({
  imports: [TypeOrmModule, HelperModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
