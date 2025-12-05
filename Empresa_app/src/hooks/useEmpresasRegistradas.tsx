import { useState, useEffect, useRef } from "react";
import { EmpresaApi } from "../api/empresaApi";
import { Empresa, EmpresasRegistradasResponse } from "../interfaces/reproductorInterface";

interface UseEmpresasRegistradas {
    isLoading: boolean;
    LoadEmpresas: () => void;
    empresas: Empresa[];
}

export const useEmpresasRegistradas = (): UseEmpresasRegistradas => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const pageRef = useRef(1);
    const isLoadingRef = useRef(false);
    const limit = 10;

    const LoadEmpresas = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await EmpresaApi.get<EmpresasRegistradasResponse>(`/empresas/registro?page=${pageRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setEmpresas((prevList) => [...prevList, ...data]);
            pageRef.current += 1;
        }
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    useEffect(() => {
        setEmpresas([]);
        pageRef.current = 1;
        LoadEmpresas();
    }, []);

    return { isLoading, LoadEmpresas, empresas };
}
