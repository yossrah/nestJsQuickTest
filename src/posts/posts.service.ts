import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postRepository:Repository<Post>,
  @InjectRepository(User) private readonly userRepository:Repository<User>){}
  async create(createPostDto: CreatePostDto) {
    const id=createPostDto.user.id
    const user=await this.userRepository.findOneBy({id})
    if(!user){
      throw new ConflictException('user does not exists');
  }
    const new_post=this.postRepository.create({...createPostDto,
    CreatedAt:new Date()})
    return this.postRepository.save(new_post)
  }

  async findAll() {
    const posts= await this.postRepository.find({relations:['user']})
    return posts
  }

  async findOne(id: number) {
    const post=await this.postRepository.findOneBy({id})
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete({id})
  }
}
