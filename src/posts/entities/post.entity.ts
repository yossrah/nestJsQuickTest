import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"posts"})
export class Post {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    subject:string
    @Column()
    content:string
    @Column()
    CreatedAt:Date
    //define many to one posts belongs to a user
    @ManyToOne(()=>User,(user)=>user.posts)
    user:User;
}
