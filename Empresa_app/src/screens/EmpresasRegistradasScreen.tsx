import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { EmpresaCard } from "../components/EmpresaCard";
import { useEmpresas } from "../hooks/useEmpresas";

export const EmpresasRegistradasScreen = () => {
    const { isLoading, empresas, LoadEmpresas } = useEmpresas();

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Empresas Registradas</Text>
            {isLoading && <ActivityIndicator size="large" />}
            <FlatList
                data={empresas}
                keyExtractor={(item) => item.id_empresa.toString()}
                renderItem={({ item }) => <EmpresaCard empresa={item} />}
                onEndReached={LoadEmpresas}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}
