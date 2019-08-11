import { IsNumber, IsOptional, IsArray, IsString, Length, IsDateString } from "class-validator";

export class UserDto {

    @IsString()
    @IsOptional()
    id?: BigInt;

    @IsArray()
    @IsOptional()
    ids: BigInt[];

    @IsString()
    @IsOptional()
    accountId?: string;

    @IsArray()
    @IsOptional()
    accountIds: string[];

    @IsArray()
    @Length(null, 80)
    @IsOptional()
    name: string;

    @IsArray()
    @IsOptional()
    labels: any[]

    @IsString()
    @Length(null, 1000)
    @IsOptional()
    info: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsArray()
    @IsOptional()
    movies: any[]

    @IsDateString()
    @IsOptional()
    createDate: DateConstructor

    @IsDateString()
    @IsOptional()
    updateDate: DateConstructor

    @IsString()
    @IsOptional()
    del: string;
}