import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Req } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';
import * as express from 'express';

@Controller('empresas')
export class EmpresasController {
    constructor(private readonly empresasService: EmpresasService) {}

    // ==================== EMPRESAS ====================

    @Post()
    createEmpresa(@Body(new ValidationPipe()) data: CreateEmpresaDto) {
        return this.empresasService.createEmpresa(data);
    }

    @Get()
    async findAllEmpresas(
        @Req() req: express.Request,
        @Query('page') page?: string,
        @Query('limit') limit?: string
    ) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas`;
        return this.empresasService.findAllEmpresas(pageNum, limitNum, baseUrl);
    }

    @Get('registro')
    async listarEmpresas(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/registro`;
        return this.empresasService.listarEmpresas(Number(page), Number(limit), baseUrl);
    }

    @Get('giro/:giro')
    async empresasPorGiro(
        @Param('giro') giro: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/giro`;
        return this.empresasService.empresasPorGiro(giro, Number(page), Number(limit), baseUrl);
    }

    @Get(':id')
    findOneEmpresa(@Param('id') id: number) {
        return this.empresasService.findOneEmpresa(Number(id));
    }

    @Patch(':id')
    updateEmpresa(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdateEmpresaDto) {
        return this.empresasService.updateEmpresa(Number(id), data);
    }

    @Delete(':id')
    removeEmpresa(@Param('id') id: number) {
        return this.empresasService.removeEmpresa(Number(id));
    }

    // ==================== VACANTES ====================

    @Post('vacante')
    createVacante(@Body(new ValidationPipe()) data: CreateVacanteDto) {
        return this.empresasService.createVacante(data);
    }

    @Get('vacantes/all')
    async findAllVacantes(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/vacantes/all`;
        return this.empresasService.findAllVacantes(Number(page), Number(limit), baseUrl);
    }

    @Get('vacantes/empresa/:id_empresa/activas')
    async vacantesActivasPorEmpresa(
        @Param('id_empresa') id_empresa: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/vacantes/empresa/activas`;
        return this.empresasService.vacantesActivasPorEmpresa(Number(id_empresa), Number(page), Number(limit), baseUrl);
    }

    @Get('vacantes/modalidad/remoto')
    async vacantesModalidadRemota(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/vacantes/modalidad/remoto`;
        return this.empresasService.vacantesModalidadRemota(Number(page), Number(limit), baseUrl);
    }

    @Get('vacantes/count/cerradas')
    contarVacantesCerradas() {
        return this.empresasService.contarVacantesCerradas();
    }

    @Get('vacantes/con-postulantes')
    async vacantesConPostulantes(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/vacantes/con-postulantes`;
        return this.empresasService.vacantesConPostulantes(Number(page), Number(limit), baseUrl);
    }

    @Get('vacantes/activas')
    async vacantesSoloActivas(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/vacantes/activas`;
        return this.empresasService.vacantesSoloActivas(Number(page), Number(limit), baseUrl);
    }

    @Get('vacante/:id')
    findOneVacante(@Param('id') id: number) {
        return this.empresasService.findOneVacante(Number(id));
    }

    @Patch('vacante/:id')
    updateVacante(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdateVacanteDto) {
        return this.empresasService.updateVacante(Number(id), data);
    }

    @Patch('vacante/:id/cerrar')
    closeVacante(@Param('id') id: number) {
        return this.empresasService.closeVacante(Number(id));
    }

    @Delete('vacante/:id')
    removeVacante(@Param('id') id: number) {
        return this.empresasService.removeVacante(Number(id));
    }

    // ==================== POSTULACIONES ====================

    @Post('postulacion')
    createPostulacion(@Body(new ValidationPipe()) data: CreatePostulacionDto) {
        return this.empresasService.createPostulacion(data);
    }

    @Get('postulaciones/all')
    async findAllPostulaciones(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/postulaciones/all`;
        return this.empresasService.findAllPostulaciones(Number(page), Number(limit), baseUrl);
    }

    @Get('postulaciones/vacante/:id_vacante')
    async postulacionesPorVacante(
        @Param('id_vacante') id_vacante: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/postulaciones/vacante`;
        return this.empresasService.postulacionesPorVacante(Number(id_vacante), Number(page), Number(limit), baseUrl);
    }

    @Get('postulaciones/por-fecha')
    async postulacionesPorFecha(
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/postulaciones/por-fecha`;
        return this.empresasService.postulacionesPorFecha(fechaInicio, fechaFin, Number(page), Number(limit), baseUrl);
    }

    @Get('postulantes/con-cv')
    async postulantesConCV(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/empresas/postulantes/con-cv`;
        return this.empresasService.postulantesConCV(Number(page), Number(limit), baseUrl);
    }

    @Get('postulacion/:id')
    findOnePostulacion(@Param('id') id: number) {
        return this.empresasService.findOnePostulacion(Number(id));
    }

    @Patch('postulacion/:id')
    updatePostulacion(@Param('id') id: number, @Body(new ValidationPipe()) data: UpdatePostulacionDto) {
        return this.empresasService.updatePostulacion(Number(id), data);
    }

    @Patch('postulacion/:id/estatus')
    updateEstatusPostulacion(@Param('id') id: number, @Body('estatus') estatus: string) {
        return this.empresasService.updateEstatusPostulacion(Number(id), estatus);
    }

    @Delete('postulacion/:id')
    removePostulacion(@Param('id') id: number) {
        return this.empresasService.removePostulacion(Number(id));
    }
}
