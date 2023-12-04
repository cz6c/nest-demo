import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorator/public-auth.decorator';

@ApiTags('文件上传')
@Controller('files')
export class UploadController {
  @Public()
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // return file;
    const { path } = file;
    const url = path.split('uploads')[1];
    return { url };
  }
}
