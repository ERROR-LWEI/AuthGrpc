import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany } from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity()
export class Role {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt;

    @Column({ type: 'varchar', length: '50', nullable: false })
    value: String;

    @Column({ type: 'varchar', length: '50', nullable: false })
    name: String;

    @OneToMany(() => Permissions, (permissions: Permissions) => permissions.roles, {
        cascade: true
    })
    @JoinTable()
    permissionss: Permissions[];

    @CreateDateColumn()
    createDate: DateConstructor

    @UpdateDateColumn()
    updateDate: DateConstructor

    @Column({ type: 'varchar', length: '20', default: '0' })
    del: String;

}