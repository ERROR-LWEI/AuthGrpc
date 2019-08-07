import { Catch, RpcExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export default class AllExceptions implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        return throwError(exception.getError());
    }
}