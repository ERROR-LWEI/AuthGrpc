import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Status, Type } from '../enumeration/status';

export interface Response<T> {
    code: number;
    type: string;
    message: string;
    data?: T;
}

export class Response<T> implements Response<T> {
    constructor(code, type, message, data) {
        this.code = code;
        this.type = type;
        this.message = message;
        this.data = data;
    }
}

@Injectable()
export default class ResIntercept<T> implements NestInterceptor<T, Response<T>> {
    constructor(private readonly msg?: string) {
        this.msg = msg || "成功"
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map((data) => {
            return { code: Status.normalOk, type: Type.normalOk, message: this.msg, data }
        }));
    }
}