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

  @Column('numeric')
  id_invgate: number;

  @ManyToOne(() => Agente, (agent) => agent.id, { cascade: true })
  id_agent: number;

  @Column('text')
  request: string;

  @ManyToOne(() => Type, (type) => type.id, { cascade: true })
  type_id: number;

  @ManyToOne(() => Country, (country) => country.id, { cascade: true })
  country_id: number;

  @Column('numeric')
  request_date: number;

  @Column('numeric')
  implementation_date: number;

  @ManyToOne(() => Segment, (seg) => seg.id, { cascade: true })
  segment_id?: number;

  @ManyToOne(() => Via, (via) => via.id, { cascade: true })
  via_id: number;
}
