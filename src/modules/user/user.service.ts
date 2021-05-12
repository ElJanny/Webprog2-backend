import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../job/entities/job.entity';
import { job_process } from '../job/entities/job_process.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Job)
    private JobRepository: Repository<Job>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.points = 0;
    user.jobs_done = 0;
    return await this.usersRepository.save(user)
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user= await this.usersRepository.findOne(+id)
    if(updateUserDto.current_jobs){
      updateUserDto.current_jobs.process=job_process.UNDER_WORKING
      user.current_jobs.push(updateUserDto.current_jobs)
    }
    if(updateUserDto.points){
      user.points+=updateUserDto.points
    }
    if(updateUserDto.titleImageId){
      user.titleImageId = updateUserDto.titleImageId
    }
    return await this.usersRepository.save(user)
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

  async removeJob(id: number, updateUserDto: UpdateUserDto){
    let user= await this.usersRepository.findOne(+id)
    if(updateUserDto.current_jobs){
      updateUserDto.current_jobs.process=job_process.FREE
      console.log(updateUserDto)
      let job: Job
      user.current_jobs.forEach(element =>{
        if (element.id==updateUserDto.current_jobs.id){
          job= element
        }
      })
      const index = user.current_jobs.indexOf(job, 0);
      if (index > -1) {
        user.current_jobs[index].process= job_process.FREE
        user.current_jobs.splice(index, 1);
      }   
      job.process = job_process.FREE
      await this.JobRepository.save(job)
    }
      
    return await this.usersRepository.save(user)
  
  }

  async findByUsername(username:string){
    return this.usersRepository.findOne({where: username});
  }
}
