import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from 'src/models/user.model';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
export class VerifyOtpRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  codeOtp: string;
}

export type AuthResponseType = Readonly<{
  accessToken?: string;
  refreshToken?: string;
  user?: UserModel;
}>;

export interface IAuthOtpModel {
  user_id: string;
  user_name: string;
  otp_id: string;
  otp_user_id: string;
  otp_code_otp: string;
  otp_create_at_utc: Date;
  otp_update_at_utc: Date;
  otp_modified_by: string;
}
