import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    @OneToOne(type => User, user => user.titleImageId)
    @JoinColumn()
    user: User
}