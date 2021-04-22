import { Job } from "src/modules/job/entities/job.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    points: number;

    @OneToMany(type => Job, job=> job.user,{eager: true,cascade: true})
    current_jobs: Job[]

    @Column()
    jobs_done: number;
}
/* id?:number
username: string
password: string
points?: number
current_jobs: Job[]
jobs_done?: number*/