import { useState, useRef } from "react";
import { EmpresaApi } from "../api/empresaApi";
import { Postulacion, PostulacionesVacanteResponse, PostulacionesPorFechaResponse } from "../interfaces/reproductorInterface";

interface UsePostulaciones {
    isLoading: boolean;
    postulacionesVacante: Postulacion[];
    LoadPostulacionesVacante: (id_vacante: number) => void;
    postulacionesPorFecha: Postulacion[];
    LoadPostulacionesPorFecha: (fechaInicio: string, fechaFin: string) => void;
}

export const usePostulaciones = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postulacionesVacante, setPostulacionesVacante] = useState<Postulacion[]>([]);
    const [postulacionesPorFecha, setPostulacionesPorFecha] = useState<Postulacion[]>([]);
    const pageVacanteRef = useRef(1);
    const pageFechaRef = useRef(1);
    const isLoadingRef = useRef(false);
    const limit = 10;

    const LoadPostulacionesVacante = async (id_vacante: number, reset: boolean = false) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        if (reset) {
            setPostulacionesVacante([]);
            pageVacanteRef.current = 1;
        }
        const response = await EmpresaApi.get<PostulacionesVacanteResponse>(`/empresas/postulaciones/vacante/${id_vacante}?page=${pageVacanteRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setPostulacionesVacante((prevList) => [...prevList, ...data]);
            pageVacanteRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    const LoadPostulacionesPorFecha = async (fechaInicio: string, fechaFin: string) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<PostulacionesPorFechaResponse>(`/empresas/postulaciones/por-fecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${pageFechaRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setPostulacionesPorFecha((prevList) => [...prevList, ...data]);
            pageFechaRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    return {
        isLoading,
        postulacionesVacante,
        LoadPostulacionesVacante,
        postulacionesPorFecha,
        LoadPostulacionesPorFecha
    };
}
