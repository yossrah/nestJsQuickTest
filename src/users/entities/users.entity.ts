import { Role } from "src/roles/entities/role.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/entities/post.entity";
import { Exclude } from "class-transformer";
import { Workflow } from "src/workflow/entities/workflow.entity";

@Entity({name:"users"})
export class Utilisateur extends BaseEntity{
  @PrimaryGeneratedColumn({type:"bigint"})
  id:number
  @Column({ type: 'varchar', length: 30})
  name:string
  @Column({ type: 'varchar', length: 30})
  lastname:string
  @Column({ unique:true ,type: 'varchar', length: 40})
  username: string;
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'int' })
  phone: number;
  @Column({default:false})
  isActive: Boolean;
  @Column({type:'varchar'})
  activationToken:string
  @Column()
  CreatedAt:Date
  @Column()
  role:string
  @OneToOne(()=>Profile) //pass a callback function that is supposed to return the entity that has relationship with
  @JoinColumn()
  profile:Profile
  //define one to many in users : user can have many posts
  @OneToMany(()=>Post,(post)=>post.user)
  posts:Post[]
  @OneToMany(()=>Workflow,(workflow)=>workflow.author)
  workflows:Workflow[]
}