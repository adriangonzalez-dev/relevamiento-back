import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Agente {
  @PrimaryColumn('numeric')
  id: number;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('boolean', {
    default: true,
  })
  active: boolean;

  @ManyToOne(() => Role, (role) => role.id, { cascade: true, eager: true })
  role: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
