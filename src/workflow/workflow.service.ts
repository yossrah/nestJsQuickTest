import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from 'src/users/entities/users.entity';


@Injectable()
export class WorkflowService {
  constructor(@InjectRepository(Workflow) private readonly workflowRepository:Repository<Workflow>,
  @InjectRepository(Utilisateur) private readonly userRepository:Repository<Utilisateur>){}


  async create(createWorkflowDto: CreateWorkflowDto,user:Utilisateur) {
    createWorkflowDto.author=user
    const new_flow=this.workflowRepository.create({...createWorkflowDto,
      CreatedAt:new Date()})
   return await this.workflowRepository.save(new_flow)}

  async findAll(currentPage:number):Promise<Workflow[]> {
    const resPerPage=5
     const skip= resPerPage * (currentPage - 1)
     const workflows = await this.workflowRepository.find({
      relations: ['author', 'nodeList'],
      take: resPerPage,
      skip: skip
  });return workflows
  }

  async findOne(id: number):Promise<Workflow> {
    const workflow=await this.workflowRepository.findOne({where: {
      id,
    },
    relations:['author','nodeList']})
    if (!workflow) {
      throw new NotFoundException(`workflow with id ${id} not found`);
    }
    return workflow;
  }

  update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return this.workflowRepository.update(id,updateWorkflowDto)
  }

  async remove(id: number) {
    return this.workflowRepository.delete({id})
  }


  async generateCode(id:number){
    const workflow=await this.workflowRepository.findOne({where: {
      id,
    },
    relations:['author','nodeList']})
    if (!workflow) {
      throw new NotFoundException(`workflow with id ${id} not found`);
    }
    let generatedCode :string = 'package appiumBasics;\n'+
      'import java.net.MalformedURLException;\n'+
      'import java.net.URL;\n'+
      'import org.openqa.selenium.remote.DesiredCapabilities;\n'+
      'import org.testng.annotations.Test;\n'+
      'import io.appium.java_client.android.androidDriver;\n'+
      'import io.appium.java_client.remote.androidMobileCapabilityType;\n'+
      'import io.appium.java_client.remote.MobileCapabilityType;\n'+
      'public static void main(String[] args) throws MalformedURLException, InterruptedException {\n';
  
      for (const node of workflow.nodeList) {
        generatedCode += node.code +'\n'; // Concatenate the code of each node
      }
  
      generatedCode += '}'; // Closing brace for the main method
  
      return generatedCode;
  }
  
  async countAll(){
    try {
      const count = await this.workflowRepository.count();
      return count;
    } catch (error) {
      throw new Error(`Failed to count workflows: ${error.message}`)
    }
  }
}
