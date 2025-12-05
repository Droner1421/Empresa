import React, { useReducer } from "react";
import { EmpresaApi } from "../api/empresaApi";
import { Empresa } from "../interfaces/reproductorInterface";

export interface FormEmpresaData {
    id_empresa: number;
    nombre: string;
    giro: string;
    tamaño: string;
    direccion: string;
    telefono: string;
}

interface UseFormEmpresa {
    state: FormEmpresaData;
    handleInputChange: (fieldName: keyof FormEmpresaData, value: string | number) => void;
    handleSubmit: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleUpdate: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useEmpresaForm = (empresa?: Empresa): UseFormEmpresa => {
    const initialForm: FormEmpresaData = {
        id_empresa: empresa?.id_empresa || 0,
        nombre: empresa?.nombre || "",
        giro: empresa?.giro || "",
        tamaño: empresa?.tamaño || "",
        direccion: empresa?.direccion || "",
        telefono: empresa?.telefono || "",
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormEmpresaData, value: string | number } }
        | { type: "setLoading", payload: boolean }
        | { type: "setError", payload: string | null };

    const formReducer = (state: FormEmpresaData & { isLoading: boolean; error: string | null }, action: Action) => {
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

    const handleInputChange = (fieldName: keyof FormEmpresaData, value: string | number) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = async () => {
        dispatch({ type: "setLoading", payload: true });
        const dataToSend = {
            nombre: state.nombre,
            giro: state.giro,
            tamaño: state.tamaño,
            direccion: state.direccion,
            telefono: state.telefono
        };
        await EmpresaApi.post("/empresas", dataToSend);
        dispatch({ type: "setLoading", payload: false });
    }

    const handleUpdate = async () => {
        dispatch({ type: "setLoading", payload: true });
        const dataToSend = {
            nombre: state.nombre,
            giro: state.giro,
            tamaño: state.tamaño,
            direccion: state.direccion,
            telefono: state.telefono
        };
        await EmpresaApi.patch(`/empresas/${state.id_empresa}`, dataToSend);
        dispatch({ type: "setLoading", payload: false });
    }

    const handleDelete = async () => {
        dispatch({ type: "setLoading", payload: true });
        await EmpresaApi.delete(`/empresas/${state.id_empresa}`);
        dispatch({ type: "setLoading", payload: false });
    }

    return { 
        state: state as FormEmpresaData, 
        handleInputChange, 
        handleSubmit, 
        handleUpdate,
        handleDelete,
        isLoading: (state as any).isLoading,
        error: (state as any).error
    };
}
