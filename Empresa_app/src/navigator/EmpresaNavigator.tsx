import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeReproductorScreen } from '../screens/HomeReproductorScreen';
import { ArtistaDetailScreen } from '../screens/ArtistaDetailScreen';
import { AlbumDetailScreen } from '../screens/AlbumDetailScreen';
import { CancionesTopScreen } from '../screens/CancionesTopScreen';
import { ArtistaCRUDScreen } from '../screens/ArtistaCRUDScreen';
import { AlbumCRUDScreen } from '../screens/AlbumCRUDScreen';
import { CancionCRUDScreen } from '../screens/CancionCRUDScreen';
import { Artista, Album } from '../interfaces/reproductorInterface';

export type ReproductorStackParamList = {
  HomeReproductor: undefined;
  ArtistaDetail: { artista: Artista };
  AlbumDetail: { album: Album };
  CancionesTop: undefined;
  ArtistaCRUD: { artista?: Artista };
  AlbumCRUD: { album?: Album; id_artista?: number };
  CancionCRUD: { cancion?: any; id_album?: number };
};

const Stack = createNativeStackNavigator<ReproductorStackParamList>();

export const ReproductorNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#667eea',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeReproductor"
        component={HomeReproductorScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ArtistaDetail"
        component={ArtistaDetailScreen}
        options={({ route }) => ({
          title: route.params.artista.nombre,
        })}
      />
      <Stack.Screen
        name="AlbumDetail"
        component={AlbumDetailScreen}
        options={({ route }) => ({
          title: route.params.album.titulo,
        })}
      />
      <Stack.Screen
        name="CancionesTop"
        component={CancionesTopScreen}
        options={{
          title: 'Top Canciones',
        }}
      />
      <Stack.Screen
        name="ArtistaCRUD"
        component={ArtistaCRUDScreen}
        options={({ route }) => ({
          title: route.params?.artista ? 'Editar Artista' : 'Crear Artista',
        })}
      />
      <Stack.Screen
        name="AlbumCRUD"
        component={AlbumCRUDScreen}
        options={({ route }) => ({
          title: route.params?.album ? 'Editar Álbum' : 'Crear Álbum',
        })}
      />
      <Stack.Screen
        name="CancionCRUD"
        component={CancionCRUDScreen}
        options={({ route }) => ({
          title: route.params?.cancion ? 'Editar Canción' : 'Crear Canción',
        })}
      />
    </Stack.Navigator>
  );
};
