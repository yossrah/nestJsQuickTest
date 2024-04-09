import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthPayloadDto{
    @IsEmail()
    username:string;

    @IsNotEmpty()
    password:string
}