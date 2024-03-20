import { Category } from "src/categories/entities/category.entity";
import { Param } from "src/params/entities/param.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'components'})
export class Component {
    @PrimaryGeneratedColumn()
    id:number
    @Column({ type: 'varchar', length: 30,unique:true })
    name:string
    @Column()
    icon:string
    @Column()
    type:string
    @Column()
    code:string
    //many components can belong to one category
    @ManyToOne(()=>Category,(category)=>category.components)
    category:Category;
    //a compnent can have multiple params
    @ManyToMany(()=>Param,(param)=>param.components)
    params:Param[]
    
}
