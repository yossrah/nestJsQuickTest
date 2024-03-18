import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    subject:string;
    @IsNotEmpty()
    content:string
    @IsNotEmpty()
    user:User
}
