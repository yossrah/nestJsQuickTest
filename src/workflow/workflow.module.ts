import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Node } from 'src/nodes/entities/node.entity';

import { UsersModule } from 'src/users/users.module';
import { Utilisateur } from 'src/users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[
     
    TypeOrmModule.forFeature([
      Workflow,
      Node,
      Utilisateur
    ]
    ),UsersModule,
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService,JwtService],
})
export class WorkflowModule {}
