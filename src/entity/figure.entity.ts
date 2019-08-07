import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Movie } from './movie.entity';

@Entity()
export class Figure {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt;

    // 数据在豆瓣中的id
    @Column({ type: 'bigint' })
    doubanId: BigInt

    // 名称
    @Column({ type: 'varchar', default: '' })
    name: string;

    // 英文名
    @Column({ type: 'varchar', default: '' })
    name_en: string;

    // 图像
    @Column({ type: 'varchar' })
    avatars: string;

    // 简介
    @Column({ type: 'varchar' })
    info: string;

    // 出生年月
    @Column({ type: 'date' })
    year: DateConstructor

    // 国籍
    @Column({ type: 'varchar' })
    nationality: string

    @CreateDateColumn()
    createDate: DateConstructor

    @UpdateDateColumn()
    updateDate: DateConstructor

    @Column({ type: 'varchar', default: '0' })
    del: string
}