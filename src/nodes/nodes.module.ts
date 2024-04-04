import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from 'src/components/entities/component.entity';
import { Param } from 'src/params/entities/param.entity';
import { Node } from './entities/node.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Component,Param,Node,Workflow]),
  ],
  controllers: [NodesController],
  providers: [NodesService],
})
export class NodesModule {}
