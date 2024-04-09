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
import { Profile } from './users/entities/profile.entity';
import { Category } from './categories/entities/category.entity';
import { Component } from './components/entities/component.entity';
import { ParamsModule } from './params/params.module';
import { Post } from './posts/entities/post.entity';
import { Param } from './params/entities/param.entity';
import { MailingModule } from './mailing/mailing.module';
import { Node } from './nodes/entities/node.entity';
import { Workflow } from './workflow/entities/workflow.entity';
import { typeOrmConfigAsync } from './database/typeorm.config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync( typeOrmConfigAsync)
    ,UsersModule, RolesModule, CategoriesModule, NodesModule, PostsModule, ComponentsModule, ParamsModule,WorkflowModule, MailingModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
