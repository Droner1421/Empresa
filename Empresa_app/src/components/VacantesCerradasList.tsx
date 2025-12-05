import React from "react";
import { View, Text, FlatList } from "react-native";
import { Vacante } from "../interfaces/reproductorInterface";
import { VacanteCard } from "./VacanteCard";

interface VacantesCerradasProps {
    total: number;
    vacantes: Vacante[];
}

export const VacantesCerradasList: React.FC<VacantesCerradasProps> = ({ total, vacantes }) => (
    <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>Vacantes Cerradas: {total}</Text>
        <FlatList
            data={vacantes}
            keyExtractor={(item) => item.id_vacante.toString()}
            renderItem={({ item }) => <VacanteCard vacante={item} />}
        />
    </View>
);
