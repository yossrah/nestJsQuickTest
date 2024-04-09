import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from 'src/users/entities/users.entity';


@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postRepository:Repository<Post>,
  @InjectRepository(Utilisateur) private readonly userRepository:Repository<Utilisateur>){}
  async create(createPostDto: CreatePostDto,user:Utilisateur) {
    const new_post=this.postRepository.create({...createPostDto,
      user:user,
      CreatedAt:new Date()})
    return this.postRepository.save(new_post)
  }

  async findAll() {
    const posts= await this.postRepository.find({relations:['user']})
    return posts
  }

  async findOne(id: number,user:Utilisateur) {
    const post=await this.postRepository.findOne({where:{
      id,
      user
    }})
    if(!post){
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete({id})
  }
}
