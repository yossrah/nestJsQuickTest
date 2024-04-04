import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { User } from "../entities/user.entity";
import { plainToInstance } from "class-transformer";
//interceptor intercept incoming request before they reach the controller's route handlers. they perform additional logic before the route handler is called
//interceptor intercept outgoining response sent to the client
@Injectable()
export class UserInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<User[]>): Observable<any> | Promise<Observable<any>> {
        //console the controller name
        console.log(context.getClass().name)
        //pass to the request handler
        return next.handle()
        //.pipe(map((data)=>data.map(({password,...user})=>user)));//extract password from user
          .pipe(map((data)=>data.map((user)=>plainToInstance(User,user))))  
           //return an observable
        //intercept the response

    }
}