import { useState, useRef } from "react";
import { EmpresaApi } from "../api/empresaApi";
import { Vacante, VacantesActivasEmpresaResponse, VacantesRemotoResponse, VacantesConPostulantesResponse, VacantesCerradasCountResponse, VacanteConPostulantes } from "../interfaces/reproductorInterface";

interface UseVacantes {
    isLoading: boolean;
    vacantesActivas: Vacante[];
    LoadVacantesActivas: (id_empresa: number, reset?: boolean) => void;
    vacantesRemoto: Vacante[];
    LoadVacantesRemoto: () => void;
    vacantesConPostulantes: VacanteConPostulantes[];
    LoadVacantesConPostulantes: () => void;
    vacantesCerradasCount: number | null;
    vacantesCerradas: Vacante[];
    LoadVacantesCerradas: () => void;
    LoadVacantesCerradasCount: () => void;
}

export const useVacantes = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vacantesActivas, setVacantesActivas] = useState<Vacante[]>([]);
    const [vacantesRemoto, setVacantesRemoto] = useState<Vacante[]>([]);
    const [vacantesConPostulantes, setVacantesConPostulantes] = useState<VacanteConPostulantes[]>([]);
    const [vacantesCerradasCount, setVacantesCerradasCount] = useState<number | null>(null);
    const [vacantesCerradas, setVacantesCerradas] = useState<Vacante[]>([]);
    const pageActivasRef = useRef(1);
    const pageRemotoRef = useRef(1);
    const pageConPostulantesRef = useRef(1);
    const isLoadingRef = useRef(false);
    const limit = 10;

    const LoadVacantesActivas = async (id_empresa: number, reset: boolean = false) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        if (reset) {
            setVacantesActivas([]);
            pageActivasRef.current = 1;
        }
        const response = await EmpresaApi.get<VacantesActivasEmpresaResponse>(`/empresas/vacantes/empresa/${id_empresa}/activas?page=${pageActivasRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setVacantesActivas((prevList) => [...prevList, ...data]);
            pageActivasRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    const LoadVacantesRemoto = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<VacantesRemotoResponse>(`/empresas/vacantes/modalidad/remoto?page=${pageRemotoRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setVacantesRemoto((prevList) => [...prevList, ...data]);
            pageRemotoRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    const LoadVacantesConPostulantes = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<VacantesConPostulantesResponse>(`/empresas/vacantes/con-postulantes?page=${pageConPostulantesRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setVacantesConPostulantes((prevList) => [...prevList, ...data]);
            pageConPostulantesRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    const LoadVacantesCerradas = async () => {
        setIsLoading(true);
        const response = await EmpresaApi.get<any>(`/empresas/vacantes/count/cerradas`);
        setVacantesCerradas(response.data?.vacantes || []);
        setVacantesCerradasCount(response.data?.total ?? null);
        setIsLoading(false);
    };

    const LoadVacantesCerradasCount = async () => {
        setIsLoading(true);
        const response = await EmpresaApi.get<any>(`/empresas/vacantes/count/cerradas`);
        setVacantesCerradasCount(response.data?.total ?? null);
        setIsLoading(false);
    };

    return {
        isLoading,
        vacantesActivas,
        LoadVacantesActivas,
        vacantesRemoto,
        LoadVacantesRemoto,
        vacantesConPostulantes,
        LoadVacantesConPostulantes,
        vacantesCerradasCount,
        vacantesCerradas,
        LoadVacantesCerradas,
        LoadVacantesCerradasCount
    };
}
