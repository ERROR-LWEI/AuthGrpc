import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const role: string[] = req.user.roles;
        const isRole = () => role.some((_role) => roles.includes(_role));
        return role && roles && isRole();
    }
}