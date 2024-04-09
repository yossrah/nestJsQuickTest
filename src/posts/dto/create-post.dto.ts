import { IsNotEmpty } from "class-validator";
import { Utilisateur } from "src/users/entities/users.entity";

export class CreatePostDto {
    @IsNotEmpty()
    subject:string;
    @IsNotEmpty()
    content:string
    /*@IsNotEmpty()
    user:Utilisateur*/
}
