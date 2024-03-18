import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'roles'})
export class Role {
    /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn({type:'bigint'})//auto generated and auto increment
    id:number
  @Column({ type: 'varchar', length: 30,unique:true })
  name:string
  @Column()
  CreatedAt:Date
}
