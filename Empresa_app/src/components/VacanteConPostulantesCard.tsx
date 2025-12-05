import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { VacanteConPostulantes } from "../interfaces/reproductorInterface";
import { PostulacionCard } from "./PostulacionCard";

interface Props {
  vacante: VacanteConPostulantes;
}

const VacanteConPostulantesCard: React.FC<Props> = ({ vacante }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{vacante.puesto}</Text>
      <Text style={styles.label}>Empresa ID: <Text style={styles.value}>{vacante.id_empresa}</Text></Text>
      <Text style={styles.label}>Modalidad: <Text style={styles.value}>{vacante.modalidad}</Text></Text>
      <Text style={styles.label}>Salario: <Text style={styles.value}>${vacante.salario}</Text></Text>
      <Text style={styles.label}>Estatus: <Text style={styles.value}>{vacante.estatus}</Text></Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.value}>{vacante.descripcion}</Text>
      <Text style={styles.label}>Fecha publicación: <Text style={styles.value}>{new Date(vacante.fecha_publicacion).toLocaleDateString()}</Text></Text>
      <Text style={styles.subtitle}>Postulantes:</Text>
      {vacante.postulaciones.length === 0 ? (
        <Text style={styles.noPostulantes}>No hay postulantes</Text>
      ) : (
        vacante.postulaciones.map(postulacion => (
          <PostulacionCard key={postulacion.id_postulacion} postulacion={postulacion} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  noPostulantes: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default VacanteConPostulantesCard;
