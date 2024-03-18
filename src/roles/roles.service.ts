import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  //@InjectRepository(Role) specify what entity we want
  // roleRepository give our value (argument) a name give it Repository type and pass the entity
  
  constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}

  create(createRoleDto: CreateRoleDto) {
    //create role instance
    const newRole= this.roleRepository.create({ ...createRoleDto,
    CreatedAt:new Date()});
    return this.roleRepository.save(newRole);
  }

 async findAll() {
    const roles= await this.roleRepository.find();
    return roles
  }

 async findOne(id: number) {
   const role= await this.roleRepository.findOneBy({id})
   if(!role) {
     throw new NotFoundException(`Role with id ${id} not found`);
  }
  return role;
}

 async update(id: number, updateRoleDto: UpdateRoleDto) {
  
    return await this.roleRepository.update(id, updateRoleDto)
  }

 async remove(id: number) {
    return await this.roleRepository.delete(id)
  }
async countAll(): Promise<number> {
    try {
      // Count the number of roles in the database
      const count = await this.roleRepository.count();
      return count;
    } catch (error) {
      // If an error occurs, handle it appropriately
      throw new Error(`Failed to count roles: ${error.message}`)
    }
  }
}
