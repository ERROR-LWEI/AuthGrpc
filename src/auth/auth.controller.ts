import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Account } from '../entity/account.entity';
import { AccountDto } from './dto/account.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice: AuthService
    ){}

    @GrpcMethod('AuthService', 'InsertAccount')
    async insertAccount(data: AccountDto, metadata: any): Promise<any> {
        const res = await this.authservice.Insert(data);
        return { data: res }
    }

    @GrpcMethod('AuthService', 'FindOneAccount')
    async findOneAccount(data: AccountDto, metadata: any) {
        const res = await this.authservice.findOneAccount(data);
        return { data: res }
    }

    @GrpcMethod('AuthService', 'UpdateOneAccount')
    async updateOneAccount(data: AccountDto, metadata: any) {
        const res = await this.authservice.updateOneAccount(data);
        return { data: res }
    }
}
