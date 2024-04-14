import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Utilisateur } from 'src/users/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Post,Utilisateur]),AuthModule],
  controllers: [PostsController],
  providers: [PostsService,JwtService
    
  ],
})
export class PostsModule {}
