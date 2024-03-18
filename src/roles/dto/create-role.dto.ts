import { IsNotEmpty, IsString, MinLength, isNotEmpty, isString } from "class-validator";

export class CreateRoleDto {
   @IsString()
   @MinLength(2, { message: 'Name must have atleast 2 characters.' })
   @IsNotEmpty()
    name:string
}
