import { Component } from "src/components/entities/component.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"categories"})
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn({type:"int"})
    id:number
    @Column({ type: 'varchar', length: 30})
    name:string
    //one category can have many components
    @OneToMany(()=>Component,(component)=>component.category)
    components:Component[]
}
