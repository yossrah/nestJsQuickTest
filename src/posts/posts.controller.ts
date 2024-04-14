import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { Utilisateur } from 'src/users/entities/users.entity';
import { UserInterceptor } from 'src/users/interceptors/users.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/dtos/role.enum';

@Controller('posts')
@UseGuards(JwtAuthGuard,RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles(Role.Tester||Role.Admin)
  create(@GetUser() user: Utilisateur,@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto,user);
  }
  @Get()
  @Roles(Role.Tester||Role.Admin)
  @UseInterceptors(UserInterceptor)
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Tester)
  @UseInterceptors(UserInterceptor)
  findOne(@GetUser()user:Utilisateur,@Param('id') id: string) {
    return this.postsService.findOne(+id,user);
  }

  @Patch(':id')
  @Roles(Role.Tester||Role.Admin)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @Roles(Role.Tester||Role.Admin)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
