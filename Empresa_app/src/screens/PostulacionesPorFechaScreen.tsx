import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Button } from "react-native";
import { PostulacionCard } from "../components/PostulacionCard";
import { usePostulaciones } from "../hooks/usePostulaciones";

export const PostulacionesPorFechaScreen = () => {
    const [fechaInicio, setFechaInicio] = useState("2025-01-01");
    const [fechaFin, setFechaFin] = useState("2025-12-31");
    const { isLoading, postulacionesPorFecha, LoadPostulacionesPorFecha } = usePostulaciones();

    React.useEffect(() => {
        LoadPostulacionesPorFecha("2025-01-01", "2025-12-31");
    }, []);

    const handleBuscar = () => {
        LoadPostulacionesPorFecha(fechaInicio, fechaFin);
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Postulaciones por Fecha</Text>
            <TextInput
                style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
                placeholder="Fecha Inicio (yyyy-mm-dd)"
                value={fechaInicio}
                onChangeText={setFechaInicio}
            />
            <TextInput
                style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
                placeholder="Fecha Fin (yyyy-mm-dd)"
                value={fechaFin}
                onChangeText={setFechaFin}
            />
            <Button title="Buscar" onPress={handleBuscar} />
            {isLoading && <ActivityIndicator size="large" />}
            <FlatList
                data={postulacionesPorFecha}
                keyExtractor={(item) => item.id_postulacion.toString()}
                renderItem={({ item }) => <PostulacionCard postulacion={item} />}
            />
        </View>
    );
}
