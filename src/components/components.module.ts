import { Module, Param } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Component,Param])],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
