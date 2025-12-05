import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Empresa } from './entities/empresa.entity';
import { Vacante } from './entities/vacante.entity';
import { Postulacion } from './entities/postulacion.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Empresa, Vacante, Postulacion],
            "conexion-mysql"
        ),
    ],
    controllers: [EmpresasController],
    providers: [EmpresasService],
})
export class EmpresasModule {}
