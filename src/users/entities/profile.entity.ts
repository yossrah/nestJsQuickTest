import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"profiles"})
export class Profile{
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    @Column({ type: 'varchar', length: 30})
    name:string
    @Column({ type: 'varchar', length: 30})
    lastname:string
    @Column({ unique:true ,type: 'varchar', length: 40})
    email: string;
    @Column({ type: 'int' })
    phone: number;
}