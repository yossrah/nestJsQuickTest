import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { Utilisateur } from 'src/users/entities/users.entity';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@GetUser() user:Utilisateur,@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.create(createWorkflowDto,user);
  }

  @Get('/countAll')
  countAll(){
    return this.workflowService.countAll();
  }

  @Get()
  findAll(@Query('currentPage') currentPage:number=1) {
    return this.workflowService.findAll(currentPage);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.workflowService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkflowDto: UpdateWorkflowDto) {
    return this.workflowService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowService.remove(+id);
  }

  @Get('generateCode/:id')
  generateCode(@Param('id') id: string) {
    return this.workflowService.generateCode(+id);
  }

  
}
