import { Injectable } from '@nestjs/common';
import { FileModel } from 'src/models/file.model';
import { QueryRunner } from 'typeorm';

@Injectable()
export class FileService {
  constructor() {}
  uploadData = async (queryRunner: QueryRunner, file: any) => {
    try {
      const dataReps = queryRunner.manager.getRepository(FileModel);
      const newFile = dataReps.create({
        fileName: file.originalname,
        data: file.buffer,
        dataSize: file.size,
        modifiedBy: 'admin',
      });
      await dataReps.save(newFile);
      return newFile;
    } catch (error) {
      throw error;
    }
  };
}
