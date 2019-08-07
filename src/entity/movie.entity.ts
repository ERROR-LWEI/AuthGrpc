import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Figure } from './figure.entity';
import { User } from './user.entity';
@Entity()
export class Movie {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt

    /**
     * 电影名
     * @type string
     * @memberof Movie
     */
    @Column({ type: 'varchar', default: '' })
    name: string

    /**
     * 英文名
     * @type string
     * @memberof Movie
     */
    @Column({ type: 'varchar', default: ''})
    name_en: string

    /**
     * 年代
     * @type DateConstructor
     * @memberof Movie
     */
    @Column({ type: 'date', nullable: true })
    year: Date


    /**
     * 类型
     * @type string
     * @memberof Movie
     */
    @Column({ type: 'varchar', default: '' })
    type: string

    /**
     * 制片国家与地区
     * @type string
     * @memberof Movie
     */
    @Column({ type: 'varchar', default: '' })
    site: string

    @Column({ type: 'varchar', default: '' })
    info: string

    @Column({ type: 'varchar', default: '' })
    img: string

    @ManyToMany(() => User, (user: User) => user.movies)
    @JoinTable()
    vindicator: User[]

    /**
     * 语言
     * @type string
     * @memberof Movie
     */
    @Column({ type: 'varchar', default: '' })
    language: string

    @Column({ type: 'varchar', default: '0' })
    del: string

    @CreateDateColumn()
    createDate: DateConstructor

    @UpdateDateColumn()
    updateDate: DateConstructor
}