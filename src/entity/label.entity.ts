import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Label {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt;

    @Column({ type: 'varchar', length: '50', nullable: false })
    value: string;

    @Column({ type: 'varchar', length: '50', nullable: false})
    name: string;

    @Column({ type: 'bigint', default: 0 })
    parentId: BigInt;

    @CreateDateColumn()
    createDate: DateConstructor;

    @UpdateDateColumn()
    updateDate: DateConstructor;

    @Column({ type: 'varchar', length: '20', default: '0' })
    del: string;

    @OneToMany(type => User, user => user.labels)
    @JoinColumn()
    users: User[]
}