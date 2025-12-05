import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useCancionesTop } from "../hooks/useCanciones";
import { CancionItem } from "../components/CancionItem";

export const TopCancionesScreen = () => {
  const { canciones, isLoading, LoadCanciones } = useCancionesTop();

  const handleEndReached = () => {
    if (!isLoading) {
      LoadCanciones();
    }
  };

  const handlePress = (cancion: any) => {};

  return (
    <View style={styles.container}>
      <FlatList
        data={canciones}
        keyExtractor={(item, index) => `${item.id_cancion}-${index}`}
        renderItem={({ item, index }) => (
          <CancionItem 
            cancion={item} 
            index={index}
            onPress={handlePress}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#667eea" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay canciones disponibles</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
});
