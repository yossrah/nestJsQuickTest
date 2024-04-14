import { CanActivate, ExecutionContext,  Injectable, } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
//implements CanActivate interface
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    //using reflector to retrieve metadata from the decorator
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>  {
    //get roles array from context handler
    //pass the Roles decorator as an argument,context.getHandler() returns the method or endpoint
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const userRoles = request.user?.role?.split(',');
    return this.validateRoles(roles, userRoles);
      //console.log('userRoles',userRoles)
    //console.log('roooooooooooooooooooooooooooooooooooole',request.user)
   // const requiredRoles=this.reflector.get<string[]>(Roles,context.getHandler())
    //console.log(requiredRoles)
   /* if (!requiredRoles) {
       // If no roles are required for this endpoint, allow access
      //console.log('!requiredRoles')
        return true;
      }
      const hasRequiredRole = requiredRoles.some(role => userRoles?.includes(role));
      console.log('hasRequiredRole',hasRequiredRole)
      //hasRequiredRole? hasRequiredRole : false;*/
      
      } 
      validateRoles(roles: string[], userRoles: string[]) {
        return roles.some(role => userRoles.includes(role));
      } 
  }