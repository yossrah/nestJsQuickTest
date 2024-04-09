import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { plainToInstance } from "class-transformer";
import { Utilisateur } from "../entities/users.entity";
//interceptor intercept incoming request before they reach the controller's route handlers. they perform additional logic before the route handler is called
//interceptor intercept outgoining response sent to the client
@Injectable()
export class UserInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<Utilisateur[]>): Observable<any> | Promise<Observable<any>> {
        //console the controller name
        console.log(context.getClass().name)
        //pass to the request handler
        return next.handle()
        //.pipe(map((data)=>data.map(({password,...user})=>user)));//extract password from user
          .pipe(map((data)=>data.map((user)=>plainToInstance(Utilisateur,user))))  
           //return an observable
        //intercept the response

    }
}