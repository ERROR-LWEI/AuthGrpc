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
        return await this.metaservice.InsertLabel(data);
    }

    @GrpcMethod('AuthService', 'FindOneMeta')
    async findOneMeta(data: LableDto) {
        return await this.metaservice.findOneLabel(data);
    }

    @GrpcMethod('AuthService', 'FindMetas')
    async findMetas(data: LableDto, metadata: any) {
        return await this.metaservice.findLabels(data);
    }

    @GrpcMethod('AuthService', 'FindOrMetas')
    async FindOrMetas(data: LableDto, metadata: any) {
        return await this.metaservice.findOrLabel(data);
    }
}
