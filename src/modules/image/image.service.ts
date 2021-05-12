import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';


@Injectable()
export class ImageService {

    constructor(
        @InjectRepository(Image)
        private ImageRepository: Repository<Image>
   ){}

   async createImage(path: string){
    const image = new Image();
    image.path=path;
    return await this.ImageRepository.save(image);
   }

   async getImage(id:string){
        return await (await this.ImageRepository.findOne(id)).path
   }

}
