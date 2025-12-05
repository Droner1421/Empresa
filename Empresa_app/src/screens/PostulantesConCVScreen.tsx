
import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import { useEmpresas } from "../hooks/useEmpresas";
import PostulanteCVCard from "../components/PostulanteCVCard";

const PostulantesConCVScreen: React.FC = () => {
    const {
        postulantesConCV,
        LoadPostulantesConCV,
        isLoading,
    } = useEmpresas();

    useEffect(() => {
        LoadPostulantesConCV();
    }, []);

    const handleLoadMore = () => {
        if (!isLoading) {
            LoadPostulantesConCV();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>
                Postulantes con CV registrado
            </Text>
            {isLoading && postulantesConCV.length === 0 ? (
                <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 32 }} />
            ) : (
                <FlatList
                    data={postulantesConCV}
                    keyExtractor={(item) => item.id_postulacion.toString()}
                    renderItem={({ item }) => <PostulanteCVCard postulacion={item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 32, color: '#888' }}>
                            No hay postulantes con CV registrado.
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default PostulantesConCVScreen; // Ensure only default export is present
