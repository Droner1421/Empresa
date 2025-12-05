import React, { useReducer } from "react";
import { EmpresaApi } from "../api/empresaApi";

export interface FormPostulanteData {
    id_vacante: number;
    nombre_postulante: string;
    correo: string;
    telefono: string;
    CV_url: string;
}

interface UseFormPostulante {
    state: FormPostulanteData;
    handleInputChange: (fieldName: keyof FormPostulanteData, value: string) => void;
    handleSubmit: () => Promise<void>;
    handleUpdate: () => Promise<void>;
    handleDelete: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const usePostulanteForm = (postulante?: any, id_vacante?: number): UseFormPostulante => {
    const initialForm: FormPostulanteData = {
        id_vacante: postulante?.id_vacante || id_vacante || 0,
        nombre_postulante: postulante?.nombre_postulante || "",
        correo: postulante?.correo || "",
        telefono: postulante?.telefono || "",
        CV_url: postulante?.CV_url || "",
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormPostulanteData, value: string } }
        | { type: "setLoading", payload: boolean }
        | { type: "setError", payload: string | null };

    const formReducer = (state: FormPostulanteData & { isLoading: boolean; error: string | null }, action: Action) => {
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

    const handleInputChange = (fieldName: keyof FormPostulanteData, value: string) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        const dataToSend = {
            id_vacante: state.id_vacante,
            nombre_postulante: state.nombre_postulante,
            correo: state.correo,
            telefono: state.telefono,
            CV_url: state.CV_url
        };
        await EmpresaApi.post("/empresas/postulacion", dataToSend);
        dispatch({ type: "setLoading", payload: false });
    }

    const handleUpdate = async () => {
        dispatch({ type: "setLoading", payload: true });
        const dataToSend = {
            nombre_postulante: state.nombre_postulante,
            correo: state.correo,
            telefono: state.telefono,
            CV_url: state.CV_url
        };
        await EmpresaApi.patch(`/empresas/postulacion/${postulante.id_postulacion}`, dataToSend);
        dispatch({ type: "setLoading", payload: false });
    }

    const handleDelete = async () => {
        dispatch({ type: "setLoading", payload: true });
        await EmpresaApi.delete(`/empresas/postulacion/${postulante.id_postulacion}`);
        dispatch({ type: "setLoading", payload: false });
    }

    return { 
        state: state as FormPostulanteData, 
        handleInputChange, 
        handleSubmit, 
        handleUpdate,
        handleDelete,
        isLoading: (state as any).isLoading,
        error: (state as any).error
    };
}
