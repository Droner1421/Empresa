import { useState, useRef } from "react";
import { EmpresaApi } from "../api/empresaApi";

export const usePostulantesVacante = (id_vacante: number) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postulantes, setPostulantes] = useState<any[]>([]);
    const pageRef = useRef(1);
    const limit = 10;

    const loadPostulantes = async () => {
        setIsLoading(true);
        try {
            const response = await EmpresaApi.get(`/empresas/postulaciones/vacante/${id_vacante}?page=${pageRef.current}&limit=${limit}`);
            const data = Array.isArray(response.data?.data) ? response.data.data : [];
            if (data.length > 0) {
                setPostulantes((prevList) => [...prevList, ...data]);
                pageRef.current += 1;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, postulantes, loadPostulantes };
};
