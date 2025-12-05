import React from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { usePostulanteForm } from "../hooks/usePostulanteForm";

const PostulanteFormScreen = ({ route, navigation }) => {
    const postulante = route?.params?.postulante;
    const id_vacante = route?.params?.id_vacante;
    const {
        state,
        handleInputChange,
        handleSubmit,
        handleUpdate,
        handleDelete,
        isLoading,
        error
    } = usePostulanteForm(postulante, id_vacante);

    React.useEffect(() => {
        if (postulante) {
            handleInputChange("nombre_postulante", postulante.nombre_postulante);
            handleInputChange("correo", postulante.correo);
            handleInputChange("telefono", postulante.telefono);
            handleInputChange("CV_url", postulante.CV_url);
        }
    }, [postulante]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{postulante ? "Editar Postulante" : "Crear Postulante"}</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={state.nombre_postulante} onChangeText={text => handleInputChange("nombre_postulante", text)} />
            <TextInput style={styles.input} placeholder="Correo" value={state.correo} onChangeText={text => handleInputChange("correo", text)} />
            <TextInput style={styles.input} placeholder="Teléfono" value={state.telefono} onChangeText={text => handleInputChange("telefono", text)} />
            <TextInput style={styles.input} placeholder="CV URL" value={state.CV_url} onChangeText={text => handleInputChange("CV_url", text)} />
            {isLoading && <ActivityIndicator size="large" />}
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title={postulante ? "Actualizar" : "Crear"} onPress={postulante ? handleUpdate : handleSubmit} />
            {postulante && <Button title="Eliminar" color="red" onPress={handleDelete} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
    error: { color: 'red', marginBottom: 8 }
});

export default PostulanteFormScreen;
