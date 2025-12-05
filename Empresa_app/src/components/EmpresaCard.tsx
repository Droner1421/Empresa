import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Empresa } from "../interfaces/reproductorInterface";

interface EmpresaCardProps {
    empresa: Empresa;
}

export const EmpresaCard: React.FC<EmpresaCardProps> = ({ empresa }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("EmpresaFormScreen", { empresa })}
            style={styles.card}
            activeOpacity={0.8}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.nombreText}>
                    {empresa.nombre}
                </Text>
                <Text style={styles.giroText}>
                    {empresa.giro}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Tamaño:</Text>
                    <Text style={styles.value}>{empresa.tamaño}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.value} numberOfLines={1}>{empresa.direccion}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>{empresa.telefono}</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Registro:</Text>
                    <Text style={styles.value}>
                        {new Date(empresa.fecha_registro).toLocaleDateString()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
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
    giroText: {
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
});