import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { usePostulantesVacante } from "../hooks/usePostulantesVacante";

const PostulantesVacanteList = ({ id_vacante, onEditPostulante }) => {
    const { isLoading, postulantes, loadPostulantes } = usePostulantesVacante(id_vacante);
    
    const getStatusColor = (estatus) => {
        switch (estatus) {
            case 'En Revisión':
                return '#FFC107'; 
            case 'Aceptado':
                return '#28A745'; 
            case 'Rechazado':
                return '#DC3545';
            default:
                return '#6C757D'; 
        }
    };

    React.useEffect(() => { loadPostulantes(); }, [id_vacante, loadPostulantes]);
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => onEditPostulante(item)}
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.nombre_postulante}</Text>
                <Text style={[styles.statusBadge, { backgroundColor: getStatusColor(item.estatus) }]}>
                    {item.estatus}
                </Text>
            </View>
            
            <View style={styles.detailRow}>
                <Text style={styles.label}>Correo:</Text>
                <Text style={styles.value}>{item.correo}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.value}>{item.telefono}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderEmpty = () => {
        if (isLoading) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay postulantes registrados para esta vacante.</Text>
            </View>
        );
    };

    // Filtrar duplicados por id_postulacion
    const uniquePostulantes = Array.from(new Map(postulantes.map(item => [item.id_postulacion, item])).values());

    return (
        <View style={styles.listContainer}>
            <Text style={styles.listHeader}>Postulantes de la Vacante</Text>
            {isLoading && uniquePostulantes.length === 0 && (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="small" color="#007BFF" />
                </View>
            )}
            <FlatList
                data={uniquePostulantes}
                keyExtractor={item => item.id_postulacion.toString()}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: { 
        marginTop: 20, 
        paddingHorizontal: 16,
        backgroundColor: '#F8F9FA',
        flex: 1,
    },
    listHeader: { 
        fontSize: 20, 
        fontWeight: '700', 
        marginBottom: 10,
        color: '#343A40',
        paddingTop: 5,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    activityIndicatorContainer: {
        paddingVertical: 10,
    },
    card: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 8, 
        padding: 15, 
        marginBottom: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#007BFF', 
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: { 
        fontWeight: 'bold', 
        fontSize: 16,
        color: '#343A40',
        flex: 1,
        marginRight: 10,
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
        overflow: 'hidden',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        fontSize: 13,
        color: '#6C757D',
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        color: '#343A40',
        fontWeight: '600',
    },
    emptyContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#6C757D',
        textAlign: 'center',
    }
});

export default PostulantesVacanteList;