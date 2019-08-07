import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from '../entity/account.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice: AuthService
    ){}

    @GrpcMethod('AuthService', 'InsertAccount')
    async InsertAccount(data: Account, metadata: any): Promise<Account> {
        return await this.authservice.Insert(data);
    }

    @GrpcMethod('AuthService', 'FindOneAccount')
    async findOneAccount(data: Account, metadata: any) {

    }

    @GrpcMethod('AuthService', 'UpdateOneAccount')
    async updateOneAccount(data: Account, metadata: any) {

    }
}
