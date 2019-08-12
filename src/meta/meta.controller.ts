import { MetaService } from './meta.service';
import { LableDto } from './dto/label.dto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('meta')
export class MetaController {
    constructor(
        private readonly metaservice: MetaService
    ) {}

    @GrpcMethod('AuthService', 'InsertMeta')
    async inserMeta(data: LableDto) {
        const res = await this.metaservice.InsertLabel(data);
        return { data: res }
    }

    @GrpcMethod('AuthService', 'FindOneMeta')
    async findOneMeta(data: LableDto) {
        const res = await this.metaservice.findOneLabel(data);
        return { data: res }
    }

    @GrpcMethod('AuthService', 'FindMetas')
    async findMetas(data: LableDto, metadata: any) {
        const _data = await this.metaservice.findLabels(data);
        return _data;
    }

    @GrpcMethod('AuthService', 'FindOrMetas')
    async FindOrMetas(data: LableDto, metadata: any) {
        const res = await this.metaservice.findOrLabel(data);
        return { data: res }
    }
}
