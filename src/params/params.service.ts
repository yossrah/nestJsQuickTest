import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamDto } from './dto/update-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Param } from './entities/param.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParamsService {
  constructor(@InjectRepository(Param) private readonly paramRepository:Repository<Param>,
 ){}
  create(createParamDto: CreateParamDto) {
    const new_param=this.paramRepository.create({...createParamDto})
    return this.paramRepository.save(new_param)

  }

  async findAll() {
    const params=await this.paramRepository.find()
    return params;
  }

  async findOne(id: number) {
    const param=await this.paramRepository.findOneBy({id})
    if (!param) {
      throw new NotFoundException(`Param with id ${id} not found`);
  }
    return param;
  }

  async update(id: number, updateParamDto: UpdateParamDto) {
    return await this.paramRepository.update(id, updateParamDto);
  }

  remove(id: number) {
    return this.paramRepository.delete({id});
  }
}
