import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserProfileDto{
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;
    @IsString()
    @MinLength(3, { message: 'lastname must have atleast 3 characters.' })
    @IsNotEmpty()
    lastname:string
    @IsInt()
    phone: number
    @IsEmail()
    username:string
}