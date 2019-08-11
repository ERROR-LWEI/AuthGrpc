import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Movietype {
    
    @PrimaryGeneratedColumn()
    id: BigInt;

    @Column({ type: 'varchar', length: '20', nullable: false })
    name: string;

    @Column({ type: 'varchar', length: '20', nullable: false })
    value: string;

    @Column({ type: 'bigint', default: 0 })
    parentId: BigInt;

    @CreateDateColumn()
    createDate: DateConstructor;

    @UpdateDateColumn()
    updateDate: DateConstructor;

    @Column({ type: 'varchar', length: '10', default: '0' })
    del: string;
}