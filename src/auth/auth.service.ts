import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Account } from '../entity/account.entity';
import { User } from '../entity/user.entity';
import { Status, Type } from '../enumeration/status'
import { AccountDto } from './dto/account.dto';
import { Data } from '../vo/Data.vo';

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
            const AccountData = new Data<Account>();
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
                return AccountData.setData(saveAccount);
            }).then(res => res).catch(e => {
                return null
            });
        } catch (e) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(e) });
        }
    }

    async findOneAccount(data: AccountDto): Promise<Data<Account>> {
        try {
            const AccountData = new Data<Account>();
            const account = await this.account.findOne(data);
            return AccountData.setData(account);
        } catch (e) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(e) });
        }
    }

    async updateOneAccount(data: AccountDto): Promise<Data<AccountDto>> {
        try {
            const { id, ...params } = data;
            const AccountData = new Data<AccountDto>();
            await this.account.update({ id }, params);
            return AccountData.setData(data);
        } catch (e) {
            throw new RpcException({ code: Status.normalERROR, type: Status.normalERROR, message: JSON.stringify(e) })
        }
    }
}
