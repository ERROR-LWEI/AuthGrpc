import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from '../entity/label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Label
    ])
  ],
  controllers: [MetaController],
  providers: [MetaService]
})
export class MetaModule {}
