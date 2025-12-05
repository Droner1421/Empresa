import React, { useReducer } from "react";
import { EmpresaApi } from "../api/empresaApi";

export interface FormVacanteData {
    id_empresa: number;
    puesto: string;
    descripcion: string;
    salario: string;
    modalidad: "Presencial" | "Remoto" | "Híbrido";
}

interface UseFormVacante {
    state: FormVacanteData;
    handleInputChange: (fieldName: keyof FormVacanteData, value: string) => void;
    handleSubmit: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useVacanteForm = (id_empresa: number): UseFormVacante => {
    const initialForm: FormVacanteData = {
        id_empresa,
        puesto: "",
        descripcion: "",
        salario: "",
        modalidad: "Presencial"
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormVacanteData, value: string } }
        | { type: "setLoading", payload: boolean }
        | { type: "setError", payload: string | null };

    const formReducer = (state: FormVacanteData & { isLoading: boolean; error: string | null }, action: Action) => {
        switch (action.type) {
            case "handleInputChange":
                return {
                    ...state,
                    [action.payload.fieldName]: action.payload.value
                }
            case "setLoading":
                return {
                    ...state,
                    isLoading: action.payload
                }
            case "setError":
                return {
                    ...state,
                    error: action.payload
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, { 
        ...initialForm, 
        isLoading: false, 
        error: null 
    });

    const handleInputChange = (fieldName: keyof FormVacanteData, value: string) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        const dataToSend = {
            id_empresa: state.id_empresa,
            puesto: state.puesto,
            descripcion: state.descripcion,
            salario: Number(state.salario),
            modalidad: state.modalidad
        };
        await EmpresaApi.post("/empresas/vacante", dataToSend);
        dispatch({ type: "setLoading", payload: false });
    }

    return { 
        state: state as FormVacanteData, 
        handleInputChange, 
        handleSubmit,
        isLoading: (state as any).isLoading,
        error: (state as any).error
    };
}
