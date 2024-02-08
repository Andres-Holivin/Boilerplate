import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EncryptService } from './encrypt.service';
import { FileService } from './file.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [FileService, EncryptService],
  exports: [FileService, EncryptService],
})
export class HelperModule {}
