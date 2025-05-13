import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import { getDocs, collection } from 'firebase/firestore';
import { getDistance } from 'geolib';
import axios from 'axios';

import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';

const categorias = [
  { nome: 'Pilhas', imagem: require('../assets/pilhas.png') },
  { nome: 'Baterias', imagem: require('../assets/baterias.png') },
  { nome: 'Celulares', imagem: require('../assets/celulares.png') },
  { nome: 'Computadores', imagem: require('../assets/computadores.png') },
  { nome: 'Outros', imagem: require('../assets/outros.png') },
];

const pontosPorCategoria = {
  Pilhas: 5,
  Baterias: 10,
  Celulares: 100,
  Computadores: 150,
  Outros: 20,
};

export default function ReciclarScreen({ navigation }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [carregando, setCarregando] = useState(false);

  const verificarLixeira = async () => {
    // Simula resposta da ESP32
    return new Promise(resolve => {
      setTimeout(() => {
        const validado = true; // Altere para false para simular erro
        resolve(validado);
      }, 1500);
    });
  };

  const getLocalDescarteMaisProximo = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir a localização para encontrar o local de descarte.');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const snapshot = await getDocs(collection(db, 'locations'));
      const locais = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const latitude = data.coordenadas?._latitude;
        const longitude = data.coordenadas?._longitude;
        console.log(data)

        if (latitude && longitude) {
          locais.push({
            id: doc.id,
            latitude,
            longitude,
          });
        }
      });

      const locaisComDistancia = locais.map((local) => ({
        ...local,
        distancia: getDistance(userCoords, {
          latitude: local.latitude,
          longitude: local.longitude,
        }),
      }));

      const locaisProximos = locaisComDistancia.filter((local) => local.distancia <= 2000);
      console.log("Locais dentro de 1km: ", locaisProximos);
      if (locaisProximos.length === 0) return null;

      locaisProximos.sort((a, b) => a.distancia - b.distancia);
      return locaisProximos[0].id;
    } catch (error) {
      console.error('Erro ao obter local de descarte:', error);
      return null;
    }
  };

  const handleConfirmar = async () => {
    const qtd = parseInt(quantidade);
    if (!categoriaSelecionada || isNaN(qtd) || qtd <= 0) {
      Alert.alert('Erro', 'Selecione uma categoria e informe uma quantidade válida.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    setCarregando(true);

    try {
      const validado = await verificarLixeira();

      if (!validado) {
        Alert.alert('Lixeira vazia', 'Nenhum item foi detectado na lixeira.');
        setCarregando(false);
        return;
      }

      const localDescarteId = await getLocalDescarteMaisProximo();
      if (!localDescarteId) {
        Alert.alert('Erro', 'Não foi possível encontrar um local de descarte próximo.');
        setCarregando(false);
        return;
      }


      const pontos = pontosPorCategoria[categoriaSelecionada] * qtd;
      
      const dados = {
        uid: user.uid,
        categoria: categoriaSelecionada,
        quantidade: qtd,
        localDescarte: localDescarteId,
        pontos
      };

      const response = await axios.post(`${API_URL}/eletronicos`, dados);
      
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Reciclagem registrada com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao registrar eletrônico:', error.response?.data || error.message);
      Alert.alert('Erro', 'Ocorreu um problema ao registrar o eletrônico.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione a Categoria</Text>

      <View style={styles.grid}>
        {categorias.map((item) => (
          <TouchableOpacity
            key={item.nome}
            style={[
              styles.card,
              categoriaSelecionada === item.nome && styles.cardSelecionado
            ]}
            onPress={() => setCategoriaSelecionada(item.nome)}
          >
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.nomeCategoria}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {categoriaSelecionada && (
        <>
          <Text style={styles.label}>Informe a quantidade:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 3"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          {carregando ? (
            <ActivityIndicator size="large" color="#1B5E20" style={{ marginTop: 20 }} />
          ) : (
            <Button title="Confirmar Reciclagem" onPress={handleConfirmar} color="#1B5E20" />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardSelecionado: {
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  imagem: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  nomeCategoria: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
