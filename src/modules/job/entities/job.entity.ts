import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { job_process } from "./job_process.enum";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    process: job_process

    @ManyToOne(type => User, user => user.current_jobs)
    @JoinColumn()
    user: User
}





/*
export interface Job{
    id?:number
    title: string
    description: string
    value: number
    process: job_process
}


export enum job_process{
    DONE = "done",
    FREE = "free",
    UNDER_WORKING = "under_working"
}*/