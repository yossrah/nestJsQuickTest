import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class NodesService {
  constructor(@InjectRepository(Node) private readonly nodesRepository:Repository<Node>){}
  create(createNodeDto: CreateNodeDto) {
    const new_node=this.nodesRepository.create({...createNodeDto})
    return this.nodesRepository.save(new_node)
  }

   async findAll() {
    const nodes= await this.nodesRepository.find({relations:['component','params']})
    return nodes
  }

 async findOne(id: number) {
    const node=await this.nodesRepository.findOneBy({id})
    if (!node) {
      throw new NotFoundException(`Node with id ${id} not found`);
    }
    return node;
  }

  update(id: number, updateNodeDto: UpdateNodeDto) {
    return this.nodesRepository.update(id, updateNodeDto)
  }

 async remove(id: number) {
    return await this.nodesRepository.delete(id)
  }
}
