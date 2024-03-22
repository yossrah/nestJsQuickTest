import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/entities/post.entity";
import { Exclude } from "class-transformer";

@Entity({name:"users"})
export class User{
  @PrimaryGeneratedColumn({type:"bigint"})
  id:number
  @Column({ type: 'varchar', length: 30})
  name:string
  @Column({ type: 'varchar', length: 30})
  lastname:string
  @Column({ unique:true ,type: 'varchar', length: 40})
  email: string;
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'int' })
  phone: number;
  @Column({default:false})
  isActive: Boolean;
  @Column({type:'varchar'})
  activationCode:string
  @Column()
  CreatedAt:Date
  @Column()
  role:'Admin'|'Tester'|'TeamLeader'
  @OneToOne(()=>Profile) //pass a callback function that is supposed to return the entity that has relationship with
  @JoinColumn()
  profile:Profile
  //define one to many in users : user can have many posts
  @OneToMany(()=>Post,(post)=>post.user)
  posts:Post[]
}