import React, { useEffect } from "react";
import { View, ActivityIndicator, Button } from "react-native";
import { useVacantes } from "../hooks/useVacantes";
import { VacantesCerradasList } from "../components/VacantesCerradasList";

export const VacantesCerradasCountScreen = () => {
    const { isLoading, vacantesCerradas, vacantesCerradasCount, LoadVacantesCerradas } = useVacantes();

    useEffect(() => {
        LoadVacantesCerradas();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator size="large" style={{ marginTop: 32 }} />
            ) : (
                <VacantesCerradasList total={vacantesCerradasCount || 0} vacantes={vacantesCerradas} />
            )}
            <Button title="Actualizar" onPress={LoadVacantesCerradas} />
        </View>
    );
}
