import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>
                Panel de Administración Empresarial
            </Text>
            
            <TouchableOpacity
                style={[styles.card, styles.accentCard]}
                onPress={() => navigation.navigate("EmpresaFormScreen")}
                activeOpacity={0.7}
            >
                <View style={styles.cardContent}>
                    <Text style={[styles.icon, { color: '#28A745' }]}>+</Text>
                    <Text style={[styles.cardTitle, { color: '#343A40' }]}>Crear Nueva Empresa</Text>
                </View>
            </TouchableOpacity>
            
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("EmpresasRegistradasScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Empresas Registradas</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("PostulantesConCVScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Postulantes con CV</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("VacantesActivasEmpresaScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Vacantes Activas por Empresa</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("VacantesRemotoScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Vacantes Remoto</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("VacantesConPostulantesScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Vacantes con Postulantes</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("VacantesCerradasCountScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Vacantes Cerradas (Count)</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("PostulacionesVacanteScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Postulaciones por Vacante</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.primaryCard]}
                    onPress={() => navigation.navigate("PostulacionesPorFechaScreen")}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        <Text style={[styles.icon, { color: '#007BFF' }]}>&gt;&gt;</Text>
                        <Text style={[styles.cardTitle, { color: '#343A40' }]}>Postulaciones por Fecha</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA', 
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
        color: '#343A40',
        marginBottom: 30,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#6C757D',
        paddingBottom: 10,
    },
    cardContainer: {
        marginTop: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, 
        borderLeftWidth: 6, 
    },
    primaryCard: {
        borderLeftColor: '#007BFF',
    },
    accentCard: {
        borderLeftColor: '#28A745',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 16,
        marginRight: 15,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '600',
        flex: 1,
    }
});