import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from './dto/user.dto';
import { Status, Type } from '../enumeration/status'
import { RpcException } from '@nestjs/microservices';
import { Page } from '../vo/Page.vo';
import { List } from '../vo/List.vo';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Account)
        private readonly account: Repository<Account>,
        @InjectRepository(User)
        private readonly user: Repository<User>,
    ){}

    async findOneUser(data: UserDto): Promise<User> {
        try {
            const { ids, accountIds, labels, movies, ...params } = data;
            return await this.user.findOne(params);
        } catch (error) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(error) });
        }
    }

    async findUsers(data: UserDto): Promise<any> {
        try {
            const { ids, accountIds, labels, movies, page, pageSize, ...params } = data;
            const query = this.user.createQueryBuilder();

            if (ids) {
                query.where('id In (:ids)', { ids: ids.join(',') });
            }

            if (accountIds) {
                query.where('accountIds In (:accountIds)', { accountIds: accountIds.join(',') });
            }

            if (page && pageSize) {
                const _page = new Page().setPage(page).setPageSize(pageSize);
                const [ list, count ] = await query.limit(pageSize).offset((page - 1) * pageSize).getManyAndCount();
                _page.setCount(count);
                return new List<User, Page>().setList(list).setPage(_page);
            }
            return await query.getMany();
        } catch (error) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(error) });
        }
    }

    async updateUser(data: UserDto){
        try {
            const { id, ...params } = data;
            return await this.user.update({ id }, params);
        } catch (error) {
            
        }
    }
}
