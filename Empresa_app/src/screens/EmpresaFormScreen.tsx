
import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useEmpresaForm } from "../hooks/useEmpresaForm";
import VacanteFormModal from "../components/VacanteFormModal";
import VacantesEmpresaList from "../components/VacantesEmpresaList";
import { useVacantesEmpresa } from "../hooks/useVacantesEmpresa";

const EmpresaFormScreen = ({ route, navigation }) => {
    const empresa = route?.params?.empresa;
    const {
        state,
        handleInputChange,
        handleSubmit,
        handleUpdate,
        handleDelete,
        isLoading,
        error
    } = useEmpresaForm(empresa);
    const [showVacanteModal, setShowVacanteModal] = useState(false);

    const { vacantes, loadVacantes, isLoading: loadingVacantes } = useVacantesEmpresa(empresa?.id_empresa);
    const [refreshing, setRefreshing] = useState(false);
    const handleEditVacante = (vacante) => {
        navigation.navigate("VacanteFormScreen", { vacante });
    };
    const onRefresh = async () => {
        setRefreshing(true);
        await loadVacantes();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{empresa ? "Editar Empresa" : "Crear Empresa"}</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={state.nombre} onChangeText={text => handleInputChange("nombre", text)} />
            <TextInput style={styles.input} placeholder="Giro" value={state.giro} onChangeText={text => handleInputChange("giro", text)} />
            <TextInput style={styles.input} placeholder="Tamaño" value={state.tamaño} onChangeText={text => handleInputChange("tamaño", text)} />
            <TextInput style={styles.input} placeholder="Dirección" value={state.direccion} onChangeText={text => handleInputChange("direccion", text)} />
            <TextInput style={styles.input} placeholder="Teléfono" value={state.telefono} onChangeText={text => handleInputChange("telefono", text)} />
            {isLoading && <ActivityIndicator size="large" />}
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title={empresa ? "Actualizar" : "Crear"} onPress={empresa ? handleUpdate : handleSubmit} />
            {empresa && <>
                <Button title="Eliminar" color="red" onPress={handleDelete} />
                <Button title="Crear Vacante" color="#1976D2" onPress={() => setShowVacanteModal(true)} />
                <VacanteFormModal visible={showVacanteModal} onClose={() => setShowVacanteModal(false)} id_empresa={empresa.id_empresa} />
                <VacantesEmpresaList
                    id_empresa={empresa.id_empresa}
                    onEditVacante={handleEditVacante}
                    vacantes={vacantes}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
    error: { color: 'red', marginBottom: 8 }
});

export default EmpresaFormScreen;
