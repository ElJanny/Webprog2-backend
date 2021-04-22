import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { job_process } from './entities/job_process.enum';

@Injectable()
export class JobService {

  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job: Job = new Job();
    job.description = createJobDto.description;
    job.process = job_process.FREE;
    job.value = createJobDto.value;
    job.title = createJobDto.title;
    return await this.jobRepository.save(job);
  }

  async findAll(status) {
    return await this.jobRepository.find({where:{process: status}});
  }

  async findOne(id: number) {
    return await this.jobRepository.findOne(id);
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    updateJobDto.process =job_process.UNDER_WORKING;
    return await this.jobRepository.update(id,updateJobDto);
  }

  async remove(id: number) {
    await this.jobRepository.delete(id);
  }
}
