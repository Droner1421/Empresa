import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vacante } from './vacante.entity';

@Entity('postulaciones')
export class Postulacion {
  @PrimaryGeneratedColumn()
  id_postulacion: number;

  @Column({ type: 'int', nullable: false })
  id_vacante: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nombre_postulante: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  correo: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  telefono: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  CV_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_postulacion: Date;

  @Column({ type: 'varchar', length: 50, default: 'Pendiente' })
  estatus: string;

  @ManyToOne(() => Vacante, (vacante) => vacante.postulaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_vacante' })
  vacante: Vacante;
}
