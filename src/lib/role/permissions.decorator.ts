import { ReflectMetadata } from '@nestjs/common';
import 'reflect-metadata';

// export const Permissions = (...args: string[]) => ReflectMetadata('permissions', args);
interface PermissionsInterface {
    value: string;
    name: string;
}

/**
 * 添加权限列表
*/
export const Permissions = (options: PermissionsInterface) => {
    return (target: any, key: any, describe: any) {
        Reflect.defineMetadata('permissions', options, target);
        return target;
    }
}
