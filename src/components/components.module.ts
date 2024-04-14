import { Module, Param } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Component,Param])],
  controllers: [ComponentsController],
  providers: [ComponentsService,JwtService],
})
export class ComponentsModule {}
