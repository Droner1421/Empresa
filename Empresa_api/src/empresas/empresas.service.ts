import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { Vacante } from './entities/vacante.entity';
import { Postulacion } from './entities/postulacion.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';

@Injectable()
export class EmpresasService {
    constructor(
        @InjectRepository(Empresa, "conexion-mysql")
        private readonly repoEmpresa: Repository<Empresa>,
        @InjectRepository(Vacante, "conexion-mysql")
        private readonly repoVacante: Repository<Vacante>,
        @InjectRepository(Postulacion, "conexion-mysql")
        private readonly repoPostulacion: Repository<Postulacion>,
    ) {}

    // ==================== EMPRESAS ====================

    async createEmpresa(data: CreateEmpresaDto) {
        const empresa = this.repoEmpresa.create(data);
        return await this.repoEmpresa.save(empresa);
    }

    async findAllEmpresas(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoEmpresa
            .createQueryBuilder("e")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.id_empresa", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async findOneEmpresa(id: number) {
        const empresa = await this.repoEmpresa.findOne({ where: { id_empresa: id } });
        if (!empresa) {
            throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
        }
        return empresa;
    }

    async updateEmpresa(id: number, data: UpdateEmpresaDto) {
        await this.findOneEmpresa(id);
        await this.repoEmpresa.update(id, data);
        return await this.findOneEmpresa(id);
    }

    async removeEmpresa(id: number) {
        const empresa = await this.findOneEmpresa(id);
        await this.repoEmpresa.remove(empresa);
        return { message: `Empresa ${id} eliminada correctamente` };
    }

    // ==================== EMPRESAS - QUERIES ESPECIALES ====================

    // Listar empresas registradas
    async listarEmpresas(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoEmpresa
            .createQueryBuilder("e")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.nombre", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // Ver empresas por giro
    async empresasPorGiro(giro: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoEmpresa
            .createQueryBuilder("e")
            .where("LOWER(e.giro) LIKE LOWER(:giro)", { giro: `%${giro}%` })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.id_empresa", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?giro=${giro}&page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?giro=${giro}&page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // ==================== VACANTES ====================

    async createVacante(data: CreateVacanteDto) {
        // Verificar que la empresa existe
        await this.findOneEmpresa(data.id_empresa);
        const vacante = this.repoVacante.create(data);
        return await this.repoVacante.save(vacante);
    }

    async findAllVacantes(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoVacante
            .createQueryBuilder("v")
            .leftJoinAndSelect("v.empresa", "e")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("v.id_vacante", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async findOneVacante(id: number) {
        const vacante = await this.repoVacante
            .createQueryBuilder("v")
            .leftJoinAndSelect("v.empresa", "e")
            .leftJoinAndSelect("v.postulaciones", "p")
            .where("v.id_vacante = :id", { id })
            .getOne();

        if (!vacante) {
            throw new NotFoundException(`Vacante con ID ${id} no encontrada`);
        }
        return vacante;
    }

    async updateVacante(id: number, data: UpdateVacanteDto) {
        await this.findOneVacante(id);
        await this.repoVacante.update(id, data);
        return await this.findOneVacante(id);
    }

    async removeVacante(id: number) {
        const vacante = await this.findOneVacante(id);
        await this.repoVacante.remove(vacante);
        return { message: `Vacante ${id} eliminada correctamente` };
    }

    // ==================== VACANTES - QUERIES ESPECIALES ====================

    // Consultar vacantes activas de una empresa
    async vacantesActivasPorEmpresa(id_empresa: number, page: number = 1, limit: number = 10, baseUrl: string) {
        await this.findOneEmpresa(id_empresa);

        const [data, total] = await this.repoVacante
            .createQueryBuilder("v")
            .select(["v.id_vacante", "v.puesto", "v.descripcion", "v.salario", "v.modalidad", "v.fecha_publicacion"])
            .where("v.id_empresa = :id_empresa", { id_empresa })
            .andWhere("v.estatus = :estatus", { estatus: 'Activa' })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("v.id_vacante", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?id_empresa=${id_empresa}&page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?id_empresa=${id_empresa}&page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // Ver vacantes bajo modalidad remota
    async vacantesModalidadRemota(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoVacante
            .createQueryBuilder("v")
            .select(["v.id_vacante", "v.puesto", "v.descripcion", "v.salario", "v.modalidad", "v.fecha_publicacion"])
            .where("v.modalidad = :modalidad", { modalidad: 'Remoto' })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("v.id_vacante", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // Contar vacantes cerradas
    async contarVacantesCerradas() {
        const [vacantes, total] = await this.repoVacante
            .createQueryBuilder("v")
            .where("v.estatus = :estatus", { estatus: 'Cerrada' })
            .orderBy("v.id_vacante", "ASC")
            .getManyAndCount();

        return {
            total,
            vacantes,
        };
    }

    // Cerrar una vacante
    async closeVacante(id: number) {
        await this.findOneVacante(id);
        await this.repoVacante.update(id, { estatus: 'Cerrada' });
        return await this.findOneVacante(id);
    }

    // Mostrar vacantes junto con sus postulantes
    async vacantesConPostulantes(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoVacante
            .createQueryBuilder("v")
            .leftJoinAndSelect("v.postulaciones", "p")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("v.id_vacante", "ASC")
            .addOrderBy("p.id_postulacion", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // ==================== POSTULACIONES ====================

    async createPostulacion(data: CreatePostulacionDto) {
        // Verificar que la vacante existe
        await this.findOneVacante(data.id_vacante);
        const postulacion = this.repoPostulacion.create(data);
        return await this.repoPostulacion.save(postulacion);
    }

    async findAllPostulaciones(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoPostulacion
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.vacante", "v")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("p.id_postulacion", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    async findOnePostulacion(id: number) {
        const postulacion = await this.repoPostulacion
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.vacante", "v")
            .where("p.id_postulacion = :id", { id })
            .getOne();

        if (!postulacion) {
            throw new NotFoundException(`Postulación con ID ${id} no encontrada`);
        }
        return postulacion;
    }

    async updatePostulacion(id: number, data: UpdatePostulacionDto) {
        await this.findOnePostulacion(id);
        await this.repoPostulacion.update(id, data);
        return await this.findOnePostulacion(id);
    }

    async removePostulacion(id: number) {
        const postulacion = await this.findOnePostulacion(id);
        await this.repoPostulacion.remove(postulacion);
        return { message: `Postulación ${id} eliminada correctamente` };
    }

    // ==================== POSTULACIONES - QUERIES ESPECIALES ====================

    // Mostrar postulaciones a una vacante
    async postulacionesPorVacante(id_vacante: number, page: number = 1, limit: number = 10, baseUrl: string) {
        await this.findOneVacante(id_vacante);

        // Obtener el nombre de la vacante
        const vacante = await this.repoVacante.findOne({ where: { id_vacante } });
        const nombreVacante = vacante ? vacante.puesto : null;

        const [data, total] = await this.repoPostulacion
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.vacante", "v")
            .select(["p.id_postulacion", "p.nombre_postulante", "p.correo", "p.telefono", "p.CV_url", "p.fecha_postulacion", "p.estatus", "v.puesto"])
            .where("p.id_vacante = :id_vacante", { id_vacante })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("p.id_postulacion", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?id_vacante=${id_vacante}&page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?id_vacante=${id_vacante}&page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
           
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
             vacante: {
                id_vacante,
                nombre: nombreVacante,
            },
            data,
        };
    }

    // Consultar postulantes por fecha
    async postulacionesPorFecha(fechaInicio: string, fechaFin: string, page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoPostulacion
            .createQueryBuilder("p")
            .select(["p.id_postulacion", "p.nombre_postulante", "p.correo", "p.telefono", "p.fecha_postulacion"])
            .where("p.fecha_postulacion BETWEEN :inicio AND :fin", { 
                inicio: new Date(fechaInicio), 
                fin: new Date(fechaFin) 
            })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("p.fecha_postulacion", "DESC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // Listar postulantes con CV registrado
    async postulantesConCV(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoPostulacion
            .createQueryBuilder("p")
            .select(["p.id_postulacion", "p.nombre_postulante", "p.correo", "p.telefono", "p.CV_url", "p.fecha_postulacion"])
            .where("p.CV_url IS NOT NULL")
            .andWhere("p.CV_url != :empty", { empty: '' })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("p.fecha_postulacion", "DESC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }

    // Actualizar estatus de postulación
    async updateEstatusPostulacion(id: number, estatus: string) {
        await this.findOnePostulacion(id);
        await this.repoPostulacion.update(id, { estatus });
        return await this.findOnePostulacion(id);
    }

    // ==================== VACANTES SOLO ACTIVAS ====================
    async vacantesSoloActivas(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoVacante
            .createQueryBuilder("v")
            .where("v.estatus = :estatus", { estatus: 'Activa' })
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("v.id_vacante", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            pagination: {
                total,
                limit,
                currentPage: page,
                totalPages,
                next,
                prev,
            },
            data,
        };
    }
}
