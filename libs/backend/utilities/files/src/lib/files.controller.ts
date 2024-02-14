import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import 'multer';
import { ApiFileFields } from './api-file-fields.decorator';
import { ApiFile, ApiImageFile, ApiPdfFile } from './api-file.decorator';
import { ApiFiles } from './api-files.decorator';
import { FilesService } from './files.service';
import { ParseFile } from './parse-file.pipe';

export type FileResponse = {
  originalname: string;
  filename: string;
  typeFile: string;
  size: number;
};
@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload')
  @ApiFile('file', false)
  uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @ApiFiles('files', true)
  uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('uploadFields')
  @ApiFileFields([
    { name: 'avatar', maxCount: 1, required: true },
    { name: 'background', maxCount: 1 },
  ])
  uploadMultipleFiles(@UploadedFiles(ParseFile) files: Express.Multer.File[]) {
    console.log(files);
  }

  @Post('avatar')
  @ApiImageFile('avatar', true)
  // @ApiFile('avatar', true, { fileFilter: fileMimetypeFilter('image') })
  uploadAvatar(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }

  @Post('document')
  @ApiPdfFile('document', true)
  uploadDocument(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }




}
