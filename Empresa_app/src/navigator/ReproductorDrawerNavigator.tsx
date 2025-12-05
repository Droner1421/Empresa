import React from "react";
import { Text } from "react-native";
import {
  createDrawerNavigator,
  
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { EmpresasRegistradasScreen } from "../screens/EmpresasRegistradasScreen";
import PostulantesConCVScreen from "../screens/PostulantesConCVScreen";
import { VacantesActivasEmpresaScreen } from "../screens/VacantesActivasEmpresaScreen";
import { VacantesRemotoScreen } from "../screens/VacantesRemotoScreen";
import VacantesConPostulantesScreen from "../screens/VacantesConPostulantesScreen";
import { VacantesCerradasCountScreen } from "../screens/VacantesCerradasCountScreen";
import { PostulacionesVacanteScreen } from "../screens/PostulacionesVacanteScreen";
import { PostulacionesPorFechaScreen } from "../screens/PostulacionesPorFechaScreen";


export type DrawerParamList = {
  HomeStack: undefined;
  ArtistasActivos: undefined;
  ArtistasPais: undefined;
  CancionesTop: undefined;
  AlbumesAno: undefined;
  AlbumesConCanciones: undefined;
  GenerosCount: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerTintColor: "#1976D2",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Panel Principal" }} />
      <Stack.Screen name="EmpresasRegistradasScreen" component={EmpresasRegistradasScreen} options={{ title: "Empresas Registradas" }} />
      <Stack.Screen name="PostulantesConCVScreen" component={PostulantesConCVScreen} options={{ title: "Postulantes con CV" }} />
      <Stack.Screen name="VacantesActivasEmpresaScreen" component={VacantesActivasEmpresaScreen} options={{ title: "Vacantes Activas por Empresa" }} />
      <Stack.Screen name="VacantesRemotoScreen" component={VacantesRemotoScreen} options={{ title: "Vacantes Remoto" }} />
      <Stack.Screen name="VacantesConPostulantesScreen" component={VacantesConPostulantesScreen} options={{ title: "Vacantes con Postulantes" }} />
      <Stack.Screen name="VacantesCerradasCountScreen" component={VacantesCerradasCountScreen} options={{ title: "Vacantes Cerradas" }} />
      <Stack.Screen name="PostulacionesVacanteScreen" component={PostulacionesVacanteScreen} options={{ title: "Postulaciones por Vacante" }} />
      <Stack.Screen name="PostulacionesPorFechaScreen" component={PostulacionesPorFechaScreen} options={{ title: "Postulaciones por Fecha" }} />
      <Stack.Screen name="EmpresaFormScreen" component={require("../screens/EmpresaFormScreen").default} options={{ title: "Empresa" }} />
      <Stack.Screen name="VacanteFormScreen" component={require("../screens/VacanteFormScreen").default} options={{ title: "Vacante" }} />
      <Stack.Screen name="PostulanteFormScreen" component={require("../screens/PostulanteFormScreen").default} options={{ title: "Postulante" }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

