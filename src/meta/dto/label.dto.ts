import { IsNumber, IsOptional, IsArray, IsString, IsDateString } from "class-validator";

export class LableDto {

    @IsNumber()
    @IsOptional()
    id?: BigInt;

    @IsArray()
    @IsOptional()
    ids?: BigInt[];

    @IsString()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsOptional()
    value?: string;

    @IsNumber()
    @IsOptional()
    parentId?: BigInt;

    @IsDateString()
    @IsOptional()
    createDate?: DateConstructor;
    
    @IsDateString()
    @IsOptional()
    updateDate?: DateConstructor;

    @IsString()
    @IsOptional()
    del?: string;

    @IsArray()
    @IsOptional()
    users?: any[];

    @IsNumber()
    @IsOptional()
    page?: number;

    @IsNumber()
    @IsOptional()
    pageSize?: number;
}