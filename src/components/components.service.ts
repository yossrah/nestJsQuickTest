import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ComponentsService {
  constructor(@InjectRepository(Component) private readonly componentRepository:Repository<Component>){}
  create(createComponentDto: CreateComponentDto) {
    const new_component=this.componentRepository.create({...createComponentDto})
    return this.componentRepository.save(new_component)
  }

 async findAll(category:Category|"",currentPage: number,resPerPage:number) {
  const skip= resPerPage * (currentPage - 1)
  let queryBuilder = this.componentRepository.createQueryBuilder('component').leftJoinAndSelect('component.params', 'params');
  if(category===""){
    const components = await queryBuilder.offset(skip).limit(resPerPage).getMany();
    return components;
   }
   
   const components= this.componentRepository.findBy({category})
   return components
 }

  async countAll(){
    try {
      const count = await this.componentRepository.count();
      return count;
    } catch (error) {
      throw new Error(`Failed to count components: ${error.message}`)
    }
  }
 async findOne(id: number) {
    const component=await this.componentRepository.findOneBy({id})
    return component;
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return this.componentRepository.update(id, updateComponentDto)
  }

  remove(id: number) {
    return this.componentRepository.delete({id})
  }
}
