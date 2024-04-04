import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WorkflowService {
  constructor(@InjectRepository(Workflow) private readonly workflowRepository:Repository<Workflow>,
  @InjectRepository(User) private readonly userRepository:Repository<User>){}


  async create(createWorkflowDto: CreateWorkflowDto) {
    const id=createWorkflowDto.author.id
    const user=await this.userRepository.findOneBy({id})
    if(!user){
      throw new ConflictException('user does not exists');
  }
    const new_flow=this.workflowRepository.create({...createWorkflowDto,
      CreatedAt:new Date()})
    return this.workflowRepository.save(new_flow)
  }

  async findAll() {
    const workflows=await this.workflowRepository.find({relations:['author','nodeList']})
    return workflows
  }

  async findOne(id: number) {
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
  
}
