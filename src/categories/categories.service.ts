import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoryRepository:Repository<Category>){}
  create(createCategoryDto: CreateCategoryDto) {
    const new_category=this.categoryRepository.create({...createCategoryDto})
    return this.categoryRepository.save(new_category)
  }

  async findAll() {
    const categories= await this.categoryRepository.find({relations:['components']})
    return categories;
  }

  async findOne(id: number) {
    const category=await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations:['components']
    })
    if (!category) {
      throw new NotFoundException(`category with id ${id} not found`);
  }
    return category
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id,updateCategoryDto)
  }

  remove(id: number) {
    return this.categoryRepository.delete({id})
  }
  async countAll(){
    try {
      const count = await this.categoryRepository.count();
      return count;
    } catch (error) {
      throw new Error(`Failed to count categories: ${error.message}`)
    }
  }
}
