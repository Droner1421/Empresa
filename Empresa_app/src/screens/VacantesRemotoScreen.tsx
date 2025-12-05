import React from "react";
import { 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
    StyleSheet, 
    SafeAreaView 
} from "react-native";
import { VacanteCard } from "../components/VacanteCard";
import { useVacantes } from "../hooks/useVacantes";

export const VacantesRemotoScreen = () => {
    const { isLoading, vacantesRemoto, LoadVacantesRemoto } = useVacantes();

    React.useEffect(() => {
        LoadVacantesRemoto();
    }, []);

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={styles.loadingFooter}>
                <ActivityIndicator size="small" color="#007BFF" />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Vacantes de Trabajo Remoto
                </Text>
                
                <FlatList
                    data={vacantesRemoto}
                    keyExtractor={(item) => item.id_vacante.toString()}
                    renderItem={({ item }) => <VacanteCard vacante={item} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    
                    onEndReached={LoadVacantesRemoto}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        color: '#343A40',
        marginVertical: 15,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF', 
        paddingBottom: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    loadingFooter: {
        paddingVertical: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
});