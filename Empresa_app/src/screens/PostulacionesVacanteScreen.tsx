import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Button } from "react-native";
import { PostulacionCard } from "../components/PostulacionCard";
import { usePostulaciones } from "../hooks/usePostulaciones";

export const PostulacionesVacanteScreen = () => {
    const [idVacante, setIdVacante] = useState(1);
    const { isLoading, postulacionesVacante, LoadPostulacionesVacante } = usePostulaciones();
    const [vacanteNombre, setVacanteNombre] = useState<string>("");

    React.useEffect(() => {
        if (postulacionesVacante.length > 0 && postulacionesVacante[0].vacante?.puesto) {
            setVacanteNombre(postulacionesVacante[0].vacante.puesto);
        }
    }, [postulacionesVacante]);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Postulaciones por Vacante</Text>
            <TextInput
                style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
                placeholder="ID Vacante"
                keyboardType="numeric"
                value={idVacante.toString()}
                onChangeText={text => setIdVacante(Number(text))}
            />
            <Button title="Buscar" onPress={() => { LoadPostulacionesVacante(idVacante, true); }} />
            {vacanteNombre && (
                <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>Vacante: {vacanteNombre}</Text>
            )}
            {isLoading && <ActivityIndicator size="large" />}
            <FlatList
                data={postulacionesVacante}
                keyExtractor={(item) => item.id_postulacion.toString()}
                renderItem={({ item }) => <PostulacionCard postulacion={item} />}
            />
        </View>
    );
}
