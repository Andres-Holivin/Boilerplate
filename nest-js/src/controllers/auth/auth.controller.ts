import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthResponseType, LoginRequestDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from 'src/models/user.model';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: LoginRequestDto): Promise<AuthResponseType> {
    return this.service.login(loginDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  public register(
    @UploadedFiles()
    files: {
      image_receipt?: Express.Multer.File[];
    },
    @Body() body: UserModel,
  ): Promise<AuthResponseType | null> {
    const { image_receipt } = files;
    return this.service.register(
      body,
      image_receipt == undefined ? null : image_receipt![0],
    );
  }

  @Post('/refresh-token')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refreshToken(@Request() req) {
    return this.service.refreshToken(req.user.user as UserModel);
  }
}
