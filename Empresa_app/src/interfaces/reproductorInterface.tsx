export interface Empresa {
    id_empresa: number;
    nombre: string;
    giro: string;
    tamaño: string;
    direccion: string;
    telefono: string;
    fecha_registro: string;
}

export interface EmpresaDetalle extends Empresa {
    vacantes?: Vacante[];
}

export interface Vacante {
    id_vacante: number;
    id_empresa: number;
    puesto: string;
    descripcion: string;
    salario: number;
    modalidad: string;
    fecha_publicacion: string;
    estatus: string;
    empresa?: Empresa;
    postulaciones?: Postulacion[];
}

export interface VacanteConPostulantes extends Vacante {
    postulaciones: Postulacion[];
}

export interface Postulacion {
    id_postulacion: number;
    id_vacante: number;
    nombre_postulante: string;
    correo: string;
    telefono: string;
    CV_url: string;
    fecha_postulacion: string;
    estatus: string;
    vacante?: Vacante;
}

export interface Pagination {
    total: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    next: string | null;
    prev: string | null;
}

export interface ReproductorResponse<T> {
    pagination: Pagination;
    data: T[];
}

export interface SingleResponse<T> {
    data: T;
}

// Interfaces para creación (sin IDs y timestamps)
export interface CreateEmpresa {
    nombre: string;
    giro: string;
    tamaño: string;
    direccion: string;
    telefono: string;
}

export interface UpdateEmpresa extends Partial<CreateEmpresa> {}

export interface CreateVacante {
    id_empresa: number;
    puesto: string;
    descripcion: string;
    salario: number;
    modalidad: string;
}

export interface UpdateVacante extends Partial<CreateVacante> {
    estatus?: string;
}

export interface CreatePostulacion {
    id_vacante: number;
    nombre_postulante: string;
    correo: string;
    telefono: string;
    CV_url?: string;
}

export interface UpdatePostulacion extends Partial<CreatePostulacion> {
    estatus?: string;
}

// Endpoint: GET /api/empresas/registro?page=x&limit=y
export type EmpresasRegistradasResponse = ReproductorResponse<Empresa>;

// Endpoint: GET /api/empresas/vacantes/empresa/:id_empresa/activas?page=x&limit=y
export type VacantesActivasEmpresaResponse = ReproductorResponse<Vacante>;

// Endpoint: GET /api/empresas/vacantes/modalidad/remoto?page=x&limit=y
export type VacantesRemotoResponse = ReproductorResponse<Vacante>;

// Endpoint: GET /api/empresas/postulaciones/vacante/:id_vacante?page=x&limit=y
export type PostulacionesVacanteResponse = ReproductorResponse<Postulacion>;

// Endpoint: GET /api/empresas/postulaciones/por-fecha?fechaInicio=yyyy-mm-dd&fechaFin=yyyy-mm-dd&page=x&limit=y
export type PostulacionesPorFechaResponse = ReproductorResponse<Postulacion>;

// Endpoint: GET /api/empresas/vacantes/count/cerradas
export interface VacantesCerradasCountResponse {
    count: number;
}

// Endpoint: GET /api/empresas/postulantes/con-cv?page=x&limit=y
export type PostulantesConCVResponse = ReproductorResponse<Postulacion>;

// Endpoint: GET /api/empresas/vacantes/con-postulantes?page=x&limit=y
export type VacantesConPostulantesResponse = ReproductorResponse<VacanteConPostulantes>;
