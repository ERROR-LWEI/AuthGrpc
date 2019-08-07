import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Account } from './account.entity';
import { Movie } from './movie.entity';


@Entity()
export class User {
    
    @PrimaryGeneratedColumn({type:'bigint'})
    id: BigInt // 主键

    @OneToOne(type => Account, account => account.id)
    @Column({ type: 'bigint' })
    accountId: BigInt

    @Column({ type:'varchar', default: '' })
    name: string // 名称

    @Column({type: 'varchar', default: ''})
    label: string // 标签

    @Column({type: 'varchar', default: ''})
    info: string // 简介

    @Column({type: 'varchar', default: ''})
    avatar: string // 头像

    @ManyToMany (() => Movie, (movie: Movie) => movie.vindicator, {
        cascade: true
    })
    movies: Movie[];

    @CreateDateColumn()
    createDate: DateConstructor

    @UpdateDateColumn()
    updateDate: DateConstructor

    @Column({type: 'varchar', default: '0'})
    del: string
}