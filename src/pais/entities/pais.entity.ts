import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn('numeric')
  id: number;

  @Column('text')
  name: string;

  @Column('boolean', {
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
