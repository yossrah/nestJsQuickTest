import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
       context.getClass()
       return next.handle()
       .pipe(catchError((err)=>throwError(()=>new HttpException('error intercepted',500)))) 
    }
}