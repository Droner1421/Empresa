
import { useState, useEffect, useRef } from "react";
import { EmpresaApi } from "../api/empresaApi";
import { Empresa, EmpresasRegistradasResponse, Postulacion, PostulantesConCVResponse, VacanteConPostulantes, VacantesConPostulantesResponse } from "../interfaces/reproductorInterface";


export const useEmpresas = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [postulantesConCV, setPostulantesConCV] = useState<Postulacion[]>([]);
    const [vacantesConPostulantes, setVacantesConPostulantes] = useState<VacanteConPostulantes[]>([]);
    const pageEmpresasRef = useRef(1);
    const pagePostulantesCVRef = useRef(1);
    const pageVacantesConPostulantesRef = useRef(1);
    const isLoadingRef = useRef(false);
    const limit = 10;

    const LoadEmpresas = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<EmpresasRegistradasResponse>(`/empresas/registro?page=${pageEmpresasRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setEmpresas((prevList) => [...prevList, ...data]);
            pageEmpresasRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    const LoadPostulantesConCV = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<PostulantesConCVResponse>(`/empresas/postulantes/con-cv?page=${pagePostulantesCVRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setPostulantesConCV((prevList) => [...prevList, ...data]);
            pagePostulantesCVRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    const LoadVacantesConPostulantes = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<VacantesConPostulantesResponse>(`/empresas/vacantes/con-postulantes?page=${pageVacantesConPostulantesRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setVacantesConPostulantes((prevList) => [...prevList, ...data]);
            pageVacantesConPostulantesRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    useEffect(() => {
        setEmpresas([]);
        pageEmpresasRef.current = 1;
        LoadEmpresas();
    }, []);

    return {
        isLoading,
        empresas,
        LoadEmpresas,
        postulantesConCV,
        LoadPostulantesConCV,
        vacantesConPostulantes,
        LoadVacantesConPostulantes,
    };
}
