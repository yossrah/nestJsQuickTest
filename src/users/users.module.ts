import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Profile,Post])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
