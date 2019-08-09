import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

/*
 * @Author: wei.liu 
 * @Date: 2019-05-12 13:34:03 
 * @Last Modified by: wei.liu
 * @use 账号
 * @Last Modified time: 2019-06-06 12:48:11
 */

@Entity()
export class Account {
    /**
     * id
     * @type uuid
     * @memberof Account
     */
    @PrimaryGeneratedColumn({type:'bigint'})
    id: BigInt;

    /**
     * 账号
     * @type string
     * @memberof Account
     */
    @Column({ type: 'varchar', nullable: true })
    account: string;

    /**
     * 密码
     * @type string
     * @memberof Account
     */
    @Column({ type: 'varchar', nullable: true })
    password: string

    /**
     * 平台信息
     * @type string
     * @memberof Account
     */
    @Column({ type: 'varchar', nullable: true })
    terrace: string

    /**
     * 用户所属平台的id
     * @type string
     * @memberof Account
     */
    @Column({ type: 'varchar', nullable: true })
    terraceId: string

    /**
     * 注册时间
     * @type {string}
     * @memberof Account
     */
    @CreateDateColumn()
    createDate: DateConstructor

    /**
     * 更新时间
     * @type {string}
     * @memberof Account
     */
    @UpdateDateColumn()
    updateDate: DateConstructor

    /**
     * 删除状态
     * @type number
     * @memberof Account
     */
    @Column({ type: 'varchar', default: '0' })
    del: string
}