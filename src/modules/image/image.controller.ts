import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import  { join } from 'path';
import { of } from 'rxjs';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateJobDto } from '../job/dto/create-job.dto';
import { UpdateJobDto } from '../job/dto/update-job.dto';
import { JobService } from '../job/job.service';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';


export const storage = {
    storage: diskStorage({
        destination: 'src/Uploads/Images',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })}

@Controller('image')
export class ImageController {
    constructor(private readonly _ImageService: ImageService) {}

   
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res) {
        
        const str = await this._ImageService.getImage(id);
         return of(res.sendFile(join(process.cwd(), str)));
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', storage))
    async uploadFile(@UploadedFile() file){
      return this._ImageService.createImage(file.path);
    }
}
