import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';
import { User } from '../entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      User
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
