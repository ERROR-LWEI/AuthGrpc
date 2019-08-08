import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class Permissions {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt;

    /**
     * 权限值
     */
    @Column({ type: 'varchar', length: '50', nullable: false })
    value: String;

    /**
     * 权限名
     */
    @Column({ type: 'varchar', length: '50', nullable: false })
    name: String;

    /**
     * 上级权限操作权限id
     */
    @Column({ type: 'bigint', default: 0 })
    parentId: BigInt;

    @ManyToMany(() => Role, (role: Role) => role.permissionss, {
        cascade: true
    })
    @JoinTable()
    roles: Role[];

    @CreateDateColumn()
    createDate: DateConstructor;

    @UpdateDateColumn()
    updateDate: DateConstructor;

    /**
     * 权限删除状态
     */
    @Column({ type: 'varchar', length: '20', default: '0' })
    del: String;
}