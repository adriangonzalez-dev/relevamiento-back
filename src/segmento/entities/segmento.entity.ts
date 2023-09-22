import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Segment {
  @PrimaryGeneratedColumn()
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
