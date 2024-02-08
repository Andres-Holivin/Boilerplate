import { DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponseType, LoginRequestDto } from './auth.dto';
import { EncryptService } from 'src/utils/helper/encrypt.service';
import * as bcrypt from 'bcrypt';
import { FileService } from 'src/utils/helper/file.service';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private encrypt: EncryptService,
    private dataSource: DataSource,
    private fileService: FileService,
  ) {}
  async login(loginDto: LoginRequestDto): Promise<AuthResponseType> {
    try {
      const user: UserModel | null = await this.dataSource
        .getRepository(UserModel)
        .findOne({
          where: { phone: loginDto.phone },
        });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (
        this.encrypt.checkPassword(user.password, loginDto.password) === false
      ) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const accessToken = await this.encrypt.generateAccessToken(user);
      const refreshToken = await this.encrypt.generateRefreshToken(user);
      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (e) {
      throw e;
    }
  }
  async register(
    user: UserModel,
    image_profile?: Express.Multer.File | null,
  ): Promise<AuthResponseType> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const reqUser: UserModel = user;
      reqUser.role_name = 'user';
      reqUser.password = bcrypt.hashSync(reqUser.password, 12);
      reqUser.modifiedBy = reqUser.name;
      console.log(reqUser);
      const userRepository = queryRunner.manager.getRepository(UserModel);
      const userExist = await userRepository.findOne({
        where: { phone: reqUser.phone },
      });
      if (userExist) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      try {
        reqUser.image_profile_id =
          image_profile != null
            ? (await this.fileService.uploadData(queryRunner, image_profile)).id
            : null;
        const saveUser = await userRepository.save(reqUser);
        const accessToken = await this.encrypt.generateAccessToken(saveUser);
        const refreshToken = await this.encrypt.generateRefreshToken(saveUser);
        await queryRunner.commitTransaction();
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: saveUser,
        };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(
          'save user error: ' + error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } finally {
        await queryRunner.release();
      }
    } catch (e) {
      throw e;
    }
  }
  async refreshToken(userModel: UserModel) {
    try {
      const user_id = userModel.id;
      const userRepository = this.dataSource.getRepository(UserModel);
      console.log('user Model ', user_id, userModel);
      const user: UserModel | null = await userRepository.findOneBy({
        id: user_id,
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const accessToken = await this.encrypt.generateAccessToken(user);
      return {
        user: user,
        accessToken: accessToken,
      };
    } catch (error) {
      throw new HttpException(
        'refreshToken Error: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
