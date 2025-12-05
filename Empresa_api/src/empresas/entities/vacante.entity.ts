import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Empresa } from './empresa.entity';
import { Postulacion } from './postulacion.entity';

@Entity('vacantes')
export class Vacante {
  @PrimaryGeneratedColumn()
  id_vacante: number;

  @Column({ type: 'int', nullable: false })
  id_empresa: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  puesto: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  salario: number;

  @Column({ type: 'enum', enum: ['Presencial', 'Remoto', 'Híbrido'], nullable: false })
  modalidad: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion: Date;

  @Column({ type: 'enum', enum: ['Activa', 'Cerrada'], default: 'Activa' })
  estatus: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.vacantes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.vacante)
  postulaciones: Postulacion[];
}
