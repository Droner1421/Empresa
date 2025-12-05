import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vacante } from './vacante.entity';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  giro: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  tamaño: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  direccion: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  telefono: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @OneToMany(() => Vacante, (vacante) => vacante.empresa)
  vacantes: Vacante[];
}
