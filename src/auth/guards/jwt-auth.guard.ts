import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
//implements CanActivate interface
export class JwtAuthGuard implements CanActivate{
    //ExecutionContext allows you to get access to a bunch of metadata as well as the request and response object
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //canActivate returns a boolean or promise boolean it can be async or an obsorvable boolean
      const request=context.switchToHttp().getRequest<Request>()
      return true
  }
}