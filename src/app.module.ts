import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Job } from './modules/job/entities/job.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { Image } from './modules/image/entities/image.entity'

@Module({
  imports: [UserModule, JobModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'php-angular',
      entities: [User,Job,Image],
      synchronize: true,
    }),
    AuthModule,
    ImageModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
