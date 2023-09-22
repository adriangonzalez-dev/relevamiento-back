import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Agente {
  @PrimaryColumn('numeric')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('boolean')
  active: boolean;

  @OneToMany(() => Role, (role) => role.id, { cascade: true })
  role: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
