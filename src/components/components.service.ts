import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentsService {
  constructor(@InjectRepository(Component) private readonly componentRepository:Repository<Component>){}
  create(createComponentDto: CreateComponentDto) {
    const new_component=this.componentRepository.create({...createComponentDto})
    return this.componentRepository.save(new_component)
  }

 async findAll() {
  const components= await this.componentRepository.find({relations:['category','params']})
    return components;
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
