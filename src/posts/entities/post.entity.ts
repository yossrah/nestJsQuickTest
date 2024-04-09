
import { Utilisateur } from "src/users/entities/users.entity";
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
    @ManyToOne(()=>Utilisateur,(user)=>user.posts)
    user:Utilisateur;
}
