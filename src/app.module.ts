import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowModule } from './workflow/workflow.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { NodesModule } from './nodes/nodes.module';
import { PostsModule } from './posts/posts.module';
import { ComponentsModule } from './components/components.module';
import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';
import { Profile } from './users/entities/profile.entity';
import { Category } from './categories/entities/category.entity';
import { Component } from './components/entities/component.entity';
import { ParamsModule } from './params/params.module';
import { Post } from './posts/entities/post.entity';
import { Param } from './params/entities/param.entity';
import { MailingModule } from './mailing/mailing.module';



@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.localhost,
    port: 5432,
    password: process.env.PASSWORD,
    username: 'postgres',
    entities: [Role,User,Profile,Category,Component,Post,Param],
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
  }),UsersModule, RolesModule, CategoriesModule, NodesModule, PostsModule, ComponentsModule, ParamsModule,WorkflowModule, MailingModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
