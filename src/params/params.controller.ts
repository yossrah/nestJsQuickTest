import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParamsService } from './params.service';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamDto } from './dto/update-param.dto';

@Controller('params')
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @Post()
  create(@Body() createParamDto: CreateParamDto) {
    return this.paramsService.create(createParamDto);
  }

  @Get()
  findAll() {
    return this.paramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paramsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParamDto: UpdateParamDto) {
    return this.paramsService.update(+id, updateParamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paramsService.remove(+id);
  }
}
