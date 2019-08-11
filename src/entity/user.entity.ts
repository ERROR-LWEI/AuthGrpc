import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable, ManyToMany, JoinColumn } from "typeorm";
import { Account } from './account.entity';
import { Movie } from './movie.entity';
import { Label } from './label.entity';


@Entity()
export class User {
    
    @PrimaryGeneratedColumn({type:'bigint'})
    id: BigInt // 主键

    @OneToOne(type => Account, account => account.id)
    @JoinColumn()
    accountId: BigInt

    @Column({ type:'varchar', length: '80', default: '' })
    name: string // 名称

    @OneToMany(type => Label, meta => meta.users, {
        cascade: true
    })
    @JoinTable()
    labels: Label[] // 标签

    @Column({type: 'varchar', length: '1000', default: ''})
    info: string // 简介

    @Column({type: 'varchar', default: ''})
    avatar: string // 头像

    @ManyToMany (() => Movie, (movie: Movie) => movie.vindicator, {
        cascade: true
    })
    @JoinTable()
    movies: Movie[];

    @CreateDateColumn()
    createDate: DateConstructor

    @UpdateDateColumn()
    updateDate: DateConstructor

    @Column({type: 'varchar', default: '0'})
    del: string
}