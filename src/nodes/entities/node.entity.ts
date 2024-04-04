import { Component } from "src/components/entities/component.entity"
import { Param } from "src/params/entities/param.entity"
import { Workflow } from "src/workflow/entities/workflow.entity"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity({name:'nodes'})
export class Node {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column("jsonb")
    data:any
   
    @Column("jsonb")
    position:any
    
    @Column()
    icon:string
    
    @Column()
    type:string
    
    @Column()
    code:string
    //one node has only one component
    @OneToOne(()=>Component) //pass a callback function that is supposed to return the entity that has relationship with
    @JoinColumn()
    component:Component
    
    //a component can has multiple params
    @OneToMany(()=>Param,(param)=>param.node)
    params:Param[]

    @ManyToOne(()=>Workflow,(workflow)=>workflow.nodeList)
    workflow:Workflow
}
