import { Component } from "src/components/entities/component.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'params'})
export class Param {
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({ type: 'varchar', length: 30})
    name:string
    @Column({default:''})
    value:string
    //many params belong to many component
    @ManyToMany(()=>Component,(Component)=>Component.params)
    components:Component[]
}
