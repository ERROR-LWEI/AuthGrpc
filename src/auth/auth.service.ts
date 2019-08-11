import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Account } from '../entity/account.entity';
import { User } from '../entity/user.entity';
import { Status, Type } from '../enumeration/status'
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private readonly account: Repository<Account>,
        @InjectRepository(User)
        private readonly user: Repository<User>
    ) {}

    /**
     * 账户插入
     * @param data 
     */
    async Insert(data: AccountDto): Promise<Account> {
        try {
            const { account, password, terrace, terraceId } = data;
            const accountDOC = new Account();
            const userDOC = new User();
            const tempAccount = await this.account.findOne(data);
            if (tempAccount) {
                throw new RpcException('账号存在');
            };
            accountDOC.account = account;
            accountDOC.password = password;
            terrace && (accountDOC.terrace = terrace);
            terraceId && (accountDOC.terraceId = terraceId);
            return this.account.manager.transaction(async transactionalEntityManager => {
                let saveAccount = await transactionalEntityManager.save<Account>(accountDOC);
                userDOC.accountId = saveAccount.id;
                userDOC.name = `用户_${accountDOC.id}`;
                userDOC.info = '';
                await transactionalEntityManager.save<User>(userDOC);
                return saveAccount
            }).then(res => res).catch(e => {
                return null
            });
        } catch (e) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(e) });
        }
    }

    async findOneAccount(data: AccountDto): Promise<Account> {
        try {
            return await this.account.findOne(data)
        } catch (e) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(e) });
        }
    }

    async updateOneAccount(data: AccountDto) {
        try {
            const { id, ...params } = data;
            return await this.account.update({ id }, params);
        } catch (e) {
            throw new RpcException({ code: Status.normalERROR, type: Status.normalERROR, message: JSON.stringify(e) })
        }
    }
}
