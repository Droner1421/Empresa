import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useVacanteForm } from "../hooks/useVacanteForm";
import { EmpresaApi } from "../api/empresaApi";
import PostulantesVacanteList from "../components/PostulantesVacanteList";

const VacanteFormScreen = ({ route, navigation }) => {
    const vacante = route?.params?.vacante;
    const {
        state,
        handleInputChange,
        handleSubmit,
        isLoading,
        error
    } = useVacanteForm(vacante?.id_empresa);

    React.useEffect(() => {
        if (vacante) {
            handleInputChange("puesto", vacante.puesto);
            handleInputChange("descripcion", vacante.descripcion);
            handleInputChange("salario", String(vacante.salario));
            handleInputChange("modalidad", vacante.modalidad);
        }
    }, [vacante]);

    const handleUpdate = async () => {
        await EmpresaApi.patch(`/empresas/vacante/${vacante.id_vacante}`, {
            puesto: state.puesto,
            descripcion: state.descripcion,
            salario: Number(state.salario),
            modalidad: state.modalidad
        });
        Alert.alert("Vacante actualizada");
        navigation.goBack();
    };

    const handleDelete = async () => {
        await EmpresaApi.delete(`/empresas/vacante/${vacante.id_vacante}`);
        Alert.alert("Vacante eliminada");
        navigation.goBack();
    };

    const [showPostulanteForm, setShowPostulanteForm] = useState(false);
    const handleEditPostulante = (postulante) => {
        navigation.navigate("PostulanteFormScreen", { postulante, id_vacante: vacante.id_vacante });
    };

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
       
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{vacante ? "Editar Vacante" : "Crear Vacante"}</Text>
            <TextInput style={styles.input} placeholder="Puesto" value={state.puesto} onChangeText={text => handleInputChange("puesto", text)} />
            <TextInput style={styles.input} placeholder="Descripción" value={state.descripcion} onChangeText={text => handleInputChange("descripcion", text)} />
            <TextInput style={styles.input} placeholder="Salario" value={state.salario} onChangeText={text => handleInputChange("salario", text)} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Modalidad (Presencial, Remoto, Híbrido)" value={state.modalidad} onChangeText={text => handleInputChange("modalidad", text)} />
            {isLoading && <ActivityIndicator size="large" />}
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title={vacante ? "Actualizar" : "Crear"} onPress={vacante ? handleUpdate : handleSubmit} />
            {vacante && <Button title="Eliminar" color="red" onPress={handleDelete} />}
            {vacante && <>
                <Button title="Crear Postulante" color="#1976D2" onPress={() => navigation.navigate("PostulanteFormScreen", { id_vacante: vacante.id_vacante })} />
                <PostulantesVacanteList id_vacante={vacante.id_vacante} onEditPostulante={handleEditPostulante} refreshing={refreshing} onRefresh={onRefresh} />
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

export default VacanteFormScreen;
