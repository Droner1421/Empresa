import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useVacanteForm } from "../hooks/useVacanteForm";
import { useVacantesEmpresa } from "../hooks/useVacantesEmpresa";

const VacanteEditModal = ({ visible, onClose, vacante }) => {
    const { state, handleInputChange, handleSubmit, isLoading, error } = useVacanteForm(vacante.id_empresa);
    return null;
};

const VacantesEmpresaList = ({ id_empresa, onEditVacante }) => {
    const { isLoading, vacantes, loadVacantes } = useVacantesEmpresa(id_empresa);
    React.useEffect(() => { loadVacantes(); }, [id_empresa]);
    return (
        <View style={styles.listContainer}>
            <Text style={styles.listHeader}>Vacantes de la empresa</Text>
            {isLoading && <ActivityIndicator size="small" />}
            <FlatList
                data={vacantes}
                keyExtractor={item => item.id_vacante.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => onEditVacante(item)}>
                        <Text style={styles.title}>{item.puesto}</Text>
                        <Text>Modalidad: {item.modalidad}</Text>
                        <Text>Salario: ${item.salario}</Text>
                        <Text>Estatus: {item.estatus}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: { marginTop: 24 },
    listHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    card: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 10, elevation: 1 },
    title: { fontWeight: 'bold', fontSize: 16 }
});

export default VacantesEmpresaList;
