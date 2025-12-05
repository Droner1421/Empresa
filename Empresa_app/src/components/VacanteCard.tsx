import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Vacante } from "../interfaces/reproductorInterface";

interface VacanteCardProps {
    vacante: Vacante;
}

export const VacanteCard: React.FC<VacanteCardProps> = ({ vacante }) => {
    
    const getStatusColor = (estatus) => {
        return estatus === 'Abierta' ? '#28A745' : '#DC3545';
    };

    return (
        <View style={styles.card}>
            <View style={styles.headerContainer}>
                <Text style={styles.puestoText}>
                    {vacante.puesto}
                </Text>
                <Text style={styles.empresaText}>
                    {vacante.empresa?.nombre || `Empresa ID: ${vacante.id_empresa}`}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Modalidad:</Text>
                    <Text style={styles.value}>{vacante.modalidad}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Salario:</Text>
                    <Text style={styles.value}>{vacante.salario}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Publicación:</Text>
                    <Text style={styles.value}>
                        {new Date(vacante.fecha_publicacion).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Estatus:</Text>
                    <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(vacante.estatus) }]}>
                        {vacante.estatus}
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
    puestoText: {
        fontWeight: "700",
        fontSize: 18,
        color: '#343A40',
        marginBottom: 2,
    },
    empresaText: {
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
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 14,
        color: '#6C757D',
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        color: '#343A40',
        fontWeight: '600',
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