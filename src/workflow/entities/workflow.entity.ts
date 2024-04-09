import { Node } from "src/nodes/entities/node.entity";
import { Utilisateur } from "src/users/entities/users.entity";

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'workflows'})
export class Workflow {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @Column({ type: 'varchar', length: 30})
    name:string

    @Column({ type: 'varchar', length: 30})
    task:string

    @OneToMany(()=>Node,(node)=>node.workflow)
    nodeList:Node[]

    @ManyToOne(()=>Utilisateur,(author)=>author.workflows)
    author:Utilisateur

    @Column('jsonb')
    edgeList:any

    @Column()
    CreatedAt:Date
}
