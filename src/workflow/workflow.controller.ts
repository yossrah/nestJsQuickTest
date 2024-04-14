import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { Utilisateur } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/dtos/role.enum';

@Controller('workflow')
@UseGuards(JwtAuthGuard,RolesGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @Roles(Role.Tester)
  create(@GetUser() user:Utilisateur,@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowService.create(createWorkflowDto,user);
  }

  @Get('/countAll')
  @Roles(Role.Admin)
  countAll(){
    return this.workflowService.countAll();
  }

  @Get()
  @Roles(Role.Tester||Role.ProductOwner)
  findAll(@GetUser() user:Utilisateur, @Query('currentPage') currentPage:number=1) {
    return this.workflowService.findAll(currentPage,user);
  }

  @Get(':id')
  @Roles(Role.Tester||Role.ProductOwner)
  //find workflow by user id
  findOne(@GetUser() user:Utilisateur,@Param('id',ParseIntPipe, ) id: number) {
    return this.workflowService.findOne(id,user);
  }

  @Patch(':id')
  @Roles(Role.Tester)
  update(@Param('id') id: string, @Body() updateWorkflowDto: UpdateWorkflowDto) {
    return this.workflowService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  @Roles(Role.Tester)
  remove(@Param('id') id: string) {
    return this.workflowService.remove(+id);
  }

  @Get('generateCode/:id')
  @Roles(Role.Tester)
  generateCode(@Param('id') id: string) {
    return this.workflowService.generateCode(+id);
  }

  
}
