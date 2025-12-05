import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Postulacion } from "../interfaces/reproductorInterface";

interface Props {
    postulacion: Postulacion;
}

const PostulanteCVCard: React.FC<Props> = ({ postulacion }) => {
    const handleOpenCV = () => {
        if (postulacion.CV_url) {
            Linking.openURL(postulacion.CV_url).catch(err => {});
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.name}>
                {postulacion.nombre_postulante}
            </Text>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
                <Text style={styles.label}>Correo:</Text>
                <Text style={styles.value}>{postulacion.correo}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.value}>{postulacion.telefono}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Postulación:</Text>
                <Text style={styles.value}>{new Date(postulacion.fecha_postulacion).toLocaleDateString()}</Text>
            </View>

            <TouchableOpacity
                style={styles.cvButton}
                onPress={handleOpenCV}
                disabled={!postulacion.CV_url}
                activeOpacity={0.8}
            >
                <Text style={styles.cvText}>
                    {postulacion.CV_url ? 'Ver CV (Abrir enlace)' : 'CV No Disponible'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: '#007BFF',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#343A40',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#E9ECEF',
        marginVertical: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#6C757D',
        fontWeight: '500',
        flexShrink: 1,
    },
    value: {
        fontSize: 16,
        color: '#343A40',
        fontWeight: '600',
        textAlign: 'right',
    },
    cvButton: {
        marginTop: 15,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cvText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PostulanteCVCard;