import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Postulacion } from "../interfaces/reproductorInterface";

interface PostulacionCardProps {
    postulacion: Postulacion;
}

export const PostulacionCard: React.FC<PostulacionCardProps> = ({ postulacion }) => {
    
    const getStatusColor = (estatus) => {
        switch (estatus) {
            case 'En Revisión':
                return '#FFC107'; // Amarillo/Naranja
            case 'Aceptado':
                return '#28A745'; // Verde
            case 'Rechazado':
                return '#DC3545'; // Rojo
            default:
                return '#6C757D'; // Gris
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.headerContainer}>
                <Text style={styles.nombreText}>
                    {postulacion.nombre_postulante}
                </Text>
                <Text style={styles.vacanteText}>
                    Vacante: {postulacion.vacante?.puesto || "N/A"}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Correo:</Text>
                    <Text style={styles.value}>{postulacion.correo}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>{postulacion.telefono}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>CV Adjunto:</Text>
                    <Text style={[styles.value, { color: postulacion.CV_url ? '#28A745' : '#DC3545' }]}>
                        {postulacion.CV_url ? "Sí" : "No"}
                    </Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Postulación:</Text>
                    <Text style={styles.value}>
                        {new Date(postulacion.fecha_postulacion).toLocaleDateString()}
                    </Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Estatus:</Text>
                    <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(postulacion.estatus) }]}>
                        {postulacion.estatus}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        marginVertical: 8,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerContainer: {
        marginBottom: 10,
    },
    nombreText: {
        fontWeight: "700",
        fontSize: 18,
        color: '#343A40',
        marginBottom: 2,
    },
    vacanteText: {
        fontSize: 14,
        color: '#6C757D',
    },
    divider: {
        height: 1,
        backgroundColor: '#E9ECEF',
        marginVertical: 10,
    },
    detailsContainer: {},
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        color: '#6C757D',
        fontWeight: '500',
        marginRight: 10,
    },
    value: {
        fontSize: 14,
        color: '#343A40',
        fontWeight: '600',
        flexShrink: 1, 
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        overflow: 'hidden',
    }
});