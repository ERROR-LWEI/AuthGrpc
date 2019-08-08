import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Account } from '../entity/account.entity';
import { User } from '../entity/user.entity';
import { ErrorStatus } from '../enumeration/status'
import { Role } from '../entity/role.entity';

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
    async Insert(data: Account): Promise<Account> {
        try {
            const { account, password, terrace, terraceId } = data;
            const accountDOC = new Account();
            const userDOC = new User();
            const tempAccount = await this.account.findOne(data);
            if (tempAccount) {
                throw new RpcException({ code: ErrorStatus.apperror, message: "账号已存在" });
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
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(e) });
        }
    }

    async findOneAccount(data: Account): Promise<Account> {
        try {
            return await this.account.findOne(data)
        } catch (e) {
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(e) });
        }
    }

    /**
     * 用户权限
     * @param data 
     */
    async findAccountRole(data: Account): Promise<Account> {
        try {
            return await this.account.createQueryBuilder('account')
            .select('account.role', 'account')
            .where('account.accout = :account OR account.id = :id', { account: data.account, id: data.id })
            .getOne();
        } catch (e) {
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(e) })
        }
    }

    async updateOneAccount(data: Account) {
        try {
            const { id, ...params } = data;
            return await this.account.update({ id }, params);
        } catch (e) {
            throw new RpcException({ code: ErrorStatus.apperror, message: JSON.stringify(e) })
        }
    }
}
