import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Job } from './../../job/entities/job.entity';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    points?: number;
    jobs_done?: number;
    current_jobs?: Job;
}
