import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Param } from './entities/param.entity';
import { Component } from 'src/components/entities/component.entity';
import { Node } from 'src/nodes/entities/node.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Param,Component,Node])],

  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}
