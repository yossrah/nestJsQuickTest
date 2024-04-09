import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { Utilisateur } from 'src/users/entities/users.entity';
import { UserInterceptor } from 'src/users/interceptors/users.interceptor';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@GetUser() user: Utilisateur,@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto,user);
  }
  @Get()
  @UseInterceptors(UserInterceptor)
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(UserInterceptor)
  findOne(@GetUser()user:Utilisateur,@Param('id') id: string) {
    return this.postsService.findOne(+id,user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
