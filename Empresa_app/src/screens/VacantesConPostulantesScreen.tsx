

import React, { useEffect } from "react";
import { SafeAreaView, Text, FlatList, ActivityIndicator, StyleSheet, View } from "react-native";
import { useEmpresas } from "../hooks/useEmpresas";
import VacanteConPostulantesCard from "../components/VacanteConPostulantesCard";

const VacantesConPostulantesScreen: React.FC = () => {
    const {
        vacantesConPostulantes,
        LoadVacantesConPostulantes,
        isLoading,
    } = useEmpresas();

    useEffect(() => {
        LoadVacantesConPostulantes();
    }, []);

    const handleLoadMore = () => {
        if (!isLoading) {
            LoadVacantesConPostulantes();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.header}>Vacantes con sus postulantes</Text>
            </View>
            {isLoading && vacantesConPostulantes.length === 0 ? (
                <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 32 }} />
            ) : (
                <FlatList
                    data={vacantesConPostulantes}
                    keyExtractor={(item) => item.id_vacante.toString()}
                    renderItem={({ item }) => <VacanteConPostulantesCard vacante={item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            No hay vacantes con postulantes.
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    headerBox: {
        backgroundColor: '#1976D2',
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginBottom: 8,
        elevation: 2,
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 32,
        color: '#888',
        fontSize: 16,
    },
});

export default VacantesConPostulantesScreen;
