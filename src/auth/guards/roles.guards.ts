import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorators";

@Injectable()
//implements CanActivate interface
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //get roles array from context handler
    const requiredRoles=this.reflector.get(Roles,context.getHandler())
    console.log(requiredRoles)
    if (!requiredRoles) {
        return true;
      }
      const request=context.switchToHttp().getRequest()
      const user = request.user;
      //check if every role we set to the endpoint is found in the user's roles list
      if(requiredRoles.every(requiredRoles=>user.roles.includes(requiredRoles))){
        console.log('user has required roles')
        return true
      }
      return false 
  }
}