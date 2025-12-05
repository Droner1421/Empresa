import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresas/entities/empresa.entity';
import { Vacante } from './empresas/entities/vacante.entity';
import { Postulacion } from './empresas/entities/postulacion.entity';
import { EmpresasModule } from './empresas/empresas.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: "conexion-mysql",
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "empresa_db",
            entities: [Empresa, Vacante, Postulacion],
            synchronize: true,
            autoLoadEntities: true,
        }),
        EmpresasModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
