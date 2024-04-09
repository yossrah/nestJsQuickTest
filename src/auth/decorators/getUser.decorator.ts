import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Utilisateur } from "src/users/entities/users.entity";

//data which contains the data provided to the decorator 
//req contains the req object
//whatever we return from this function is going to be set to the parameter that is decorator with this decorator
export const GetUser=createParamDecorator((data:unknown,ctx: ExecutionContext):Utilisateur=>{
    const req=ctx.switchToHttp().getRequest();
    return req.user})