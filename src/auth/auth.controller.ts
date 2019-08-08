import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from '../entity/account.entity';
import { ErrorStatus } from '../enumeration/status'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice: AuthService
    ){}

    @GrpcMethod('AuthService', 'InsertAccount')
    async insertAccount(data: Account, metadata: any): Promise<Account> {
        return await this.authservice.Insert(data);
    }

    @GrpcMethod('AuthService', 'FindOneAccount')
    async findOneAccount(data: Account, metadata: any) {
        return await this.authservice.findOneAccount(data);
    }

    @GrpcMethod('AuthService', 'UpdateOneAccount')
    async updateOneAccount(data: Account, metadata: any) {
        
    }
}
