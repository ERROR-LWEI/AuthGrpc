import { IsNumber, IsOptional, IsString, IsEmail, IsPhoneNumber, IsDateString } from 'class-validator'

export class AccountDto {
    @IsNumber()
    @IsOptional()
    id?: BigInt;

    @IsString()
    @IsEmail()
    @IsOptional()
    account?: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    terrace: string;

    @IsString()
    @IsOptional()
    terraceId: string;

    @IsDateString()
    @IsOptional()
    createDate: DateConstructor;

    @IsDateString()
    @IsOptional()
    updateDate: DateConstructor;

    @IsString()
    @IsOptional()
    del: string;
}