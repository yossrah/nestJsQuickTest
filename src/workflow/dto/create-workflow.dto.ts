import { IsNotEmpty } from "class-validator";
import { Node } from "src/nodes/entities/node.entity";
import { Utilisateur } from "src/users/entities/users.entity";

export class CreateWorkflowDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    task: string;
    @IsNotEmpty()
    edgeList: any
    //@IsNotEmpty()
    author: Utilisateur;
    @IsNotEmpty()
    nodeList:Node[]
}
