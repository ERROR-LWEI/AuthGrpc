import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices'
import { Role } from '../entity/role.entity';
import { Repository } from 'typeorm';
import { Account } from '../entity/account.entity';
import { User } from '../entity/user.entity';
import { ErrorStatus } from '../enumeration/status'

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roles: Repository<Role>,
        @InjectRepository(Account)
        private readonly account: Repository<Account>,
        @InjectRepository(User)
        private readonly user: Repository<User>
    ){}

    /**
     * 角色新建
     * @param data 
     */
    async InsertRole(data: Role): Promise<Role> {
        try {
            const doc = new Role();
            doc.name = data.name;
            doc.value = data.value;
            return await this.roles.save(doc);
        } catch (error) {
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(error) });
        }
    }

    async findOneRole(data: Role): Promise<Role> {
        try {
            return await this.roles.findOne(data);
        } catch (error) {
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(error) });
        }
    }

    async findRoles(data: Role): Promise<Role[]> {
        try {
            return await this.roles.find(data);
        } catch (error) {
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(error) });
        }
    }
}
