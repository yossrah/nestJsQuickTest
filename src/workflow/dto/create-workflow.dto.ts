import { IsNotEmpty } from "class-validator";
import { Node } from "src/nodes/entities/node.entity";
import { User } from "src/users/entities/user.entity";

export class CreateWorkflowDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    task: string;
    @IsNotEmpty()
    edgeList: any
    @IsNotEmpty()
    author: User;

    @IsNotEmpty()
    nodeList:Node[]
}
