import { useState, useRef } from "react";
import { EmpresaApi } from "../api/empresaApi";
import { Vacante } from "../interfaces/reproductorInterface";

export const useVacantesEmpresa = (id_empresa: number) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const pageRef = useRef(1);
    const limit = 10;

    const loadVacantes = async () => {
        setIsLoading(true);
        const response = await EmpresaApi.get(`/empresas/vacantes/empresa/${id_empresa}/activas?page=${pageRef.current}&limit=${limit}`);
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        if (data.length > 0) {
            setVacantes((prevList) => [...prevList, ...data]);
            pageRef.current += 1;
        }
        setIsLoading(false);
    };

    return { isLoading, vacantes, loadVacantes };
};
