import { IsNumber, IsOptional, IsString, IsEmail, IsPhoneNumber, IsDateString } from 'class-validator'

export class AccountDto {
    @IsNumber()
    @IsOptional()
    id?: BigInt;

    @IsString()
    @IsEmail()
    @IsPhoneNumber()
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
    createDate: string;

    @IsDateString()
    @IsOptional()
    updateDate: string;

    @IsString()
    @IsOptional()
    del: string;
}