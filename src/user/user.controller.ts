import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly user: UserService
    ){}

    @GrpcMethod('AuthService', 'FindOneUser')
    async findOneUser(data: UserDto, metadata: any) {
        return await this.user.findOneUser(data);
    }

    @GrpcMethod('AuthService', 'FindUsers')
    async findUsers(data: UserDto, metadata: any) {
        return await this.user.findUsers(data);
    }

    @GrpcMethod('AuthService', 'UpdateUser')
    async updateUser(data: UserDto, metadata: any) {
        return await this.user.updateUser(data);
    }
}
