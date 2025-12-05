import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useVacanteForm } from "../hooks/useVacanteForm";

const VacanteFormModal = ({ visible, onClose, id_empresa }) => {
    const { state, handleInputChange, handleSubmit, isLoading, error } = useVacanteForm(id_empresa);
    const [success, setSuccess] = useState(false);

    const handleCreate = async () => {
        await handleSubmit();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 1200);
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.header}>Crear Vacante</Text>
                <TextInput style={styles.input} placeholder="Puesto" value={state.puesto} onChangeText={text => handleInputChange("puesto", text)} />
                <TextInput style={styles.input} placeholder="Descripción" value={state.descripcion} onChangeText={text => handleInputChange("descripcion", text)} />
                <TextInput style={styles.input} placeholder="Salario" value={state.salario} onChangeText={text => handleInputChange("salario", text)} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Modalidad (Presencial, Remoto, Híbrido)" value={state.modalidad} onChangeText={text => handleInputChange("modalidad", text)} />
                {isLoading && <ActivityIndicator size="large" />}
                {error && <Text style={styles.error}>{error}</Text>}
                {success && <Text style={styles.success}>Vacante creada correctamente</Text>}
                <Button title="Crear Vacante" onPress={handleCreate} />
                <Button title="Cerrar" color="gray" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5', justifyContent: 'center' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
    error: { color: 'red', marginBottom: 8 },
    success: { color: 'green', marginBottom: 8 }
});

export default VacanteFormModal;
