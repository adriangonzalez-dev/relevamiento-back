import { Agente } from 'src/agente/entities/agente.entity';
import { Country } from 'src/pais/entities/pais.entity';
import { Segment } from 'src/segmento/entities/segmento.entity';
import { Type } from 'src/tipo/entities/tipo.entity';
import { Via } from 'src/via_solicitud/entities/via_solicitud.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', {
    nullable: true,
  })
  id_invgate: number | null;

  @ManyToOne(() => Agente, (agent) => agent.id, { cascade: true })
  agent: number;

  @Column('text')
  request: string;

  @ManyToOne(() => Type, (type) => type.id, { cascade: true })
  type: number;

  @ManyToOne(() => Country, (country) => country.id, {
    cascade: true,
  })
  country: number;

  @Column('text')
  request_date: number;

  @Column('text', {
    nullable: true,
  })
  implementation_date: number;

  @ManyToOne(() => Segment, (seg) => seg.id, { cascade: true })
  segment?: number | null;

  @ManyToOne(() => Via, (via) => via.id, { cascade: true })
  via: number;
}
