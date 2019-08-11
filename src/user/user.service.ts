import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from './dto/user.dto';
import { Status, Type } from '../enumeration/status'
import { RpcException } from '@nestjs/microservices';

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

    async findUsers(data: UserDto): Promise<User[]> {
        try {
            const { ids, accountIds, labels, movies, ...params } = data;
            if (ids || accountIds) {
                return await this.user.findByIds(ids || accountIds);
            }
            return await this.user.find(params);
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
