import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from '../entity/label.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Status, Type } from '../enumeration/status';
import { LableDto } from './dto/label.dto';
import { Page } from '../vo/Page.vo';
import { List } from '../vo/List.vo';

@Injectable()
export class MetaService {
    constructor(
        @InjectRepository(Label)
        private readonly label: Repository<Label>,
    ){}


    /**
     * 插入标签信息
     * @param data 
     */
    async InsertLabel(data: LableDto): Promise<Label> {
        try {
            const labels = await this.findOrLabel(data);
            if (labels) {
                throw new RpcException('已存在该标签值不能重复插入')
            }
            const doc = new Label();
            doc.name = data.name;
            doc.value = data.value;
            return await this.label.save(doc);
        } catch (error) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(error) });
        }
    }

    async findOneLabel(data: LableDto): Promise<Label> {
        try {
            return await this.label.findOne(data);
        } catch (error) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(error) });
        }
    }

    async findLabels(data: LableDto): Promise<any> {
        try {
            const { page, pageSize } = data;
            const _page = new Page().setPage(page).setPageSize(pageSize);
            const [ list, count ] = await this.label.createQueryBuilder('label')
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .getManyAndCount()
            _page.setCount(count);
            return new List<Label, Page>().setList(list).setPage(_page);
        } catch (error) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(error) });
        }
    }

    async findOrLabel(data: LableDto): Promise<Label> {
        try {
            return await this.label.createQueryBuilder('label')
            .where('label.name = :name OR label.value = :value', { name: data.name, value: data.value })
            .getOne()
        } catch (error) {
            throw new RpcException({ code: Status.normalERROR, type: Type.normalErr, message: JSON.stringify(error) });
        }
    }
}
