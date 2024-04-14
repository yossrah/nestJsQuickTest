import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Category } from 'src/categories/entities/category.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('components')
@UseGuards(JwtAuthGuard)
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  findAll(@Query('category') category:Category|""="",
  @Query('currentPage') currentPage:number=1,
  @Query('resPerPage') resPerPage:number=10) {
    return this.componentsService.findAll(category,currentPage,resPerPage);
  }

  @Get('/countAll')
  countAll(){
    return this.componentsService.countAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
