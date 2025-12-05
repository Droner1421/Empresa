
import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Button } from "react-native";
import { VacanteCard } from "../components/VacanteCard";
import { useVacantes } from "../hooks/useVacantes";

export const VacantesActivasEmpresaScreen = () => {
    const [idEmpresa, setIdEmpresa] = useState(1);
    const { isLoading, vacantesActivas, LoadVacantesActivas } = useVacantes();
    const [lastSearchedId, setLastSearchedId] = React.useState<number | null>(null);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Vacantes Activas por Empresa</Text>
            <TextInput
                style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
                placeholder="ID Empresa"
                keyboardType="numeric"
                value={idEmpresa.toString()}
                onChangeText={text => setIdEmpresa(Number(text))}
            />
            <Button title="Buscar" onPress={() => {
                setLastSearchedId(idEmpresa);
                LoadVacantesActivas(idEmpresa, true);
            }} />
            {isLoading && <ActivityIndicator size="large" />}
            <FlatList
                data={vacantesActivas}
                keyExtractor={(item) => item.id_vacante.toString()}
                renderItem={({ item }) => <VacanteCard vacante={item} />}
            />
        </View>
    );
}
