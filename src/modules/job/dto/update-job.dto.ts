import { PartialType } from '@nestjs/mapped-types';
import { job_process } from '../entities/job_process.enum';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    process: job_process
}
