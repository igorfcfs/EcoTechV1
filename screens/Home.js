import React, { useState, useEffect, use } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BotaoPrimario from '../components/BotaoPrimario';
import Titulo from '../components/Titulo';
import Card from '../components/CardEcoTrashs';
import { general } from '../styles/index';
import { auth } from '../firebaseConfig';
import axios from 'axios';
import { API_URL } from '../api';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const [pontosAcumulados, setPontosAcumulados] = useState(0);
  const [recycledEletronics, setRecycledEletronics] = useState(0);
  const [userId, setUserId] = useState(null);
  const [localId, setLocalId] = useState(null);
  const [qtdLixo, setQtdLixo] = useState(null);
  const [qtdUserLixo, setQtdUserLixo] = useState(null);
  const [nomeLocal, setNomeLocal] = useState(null);

  // Busca dados do usuário logado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        fetchLocalMaisProximo(); // Busca o local mais próximo
      } else {
        console.warn("Usuário não está logado");
      }
    });

    return () => unsubscribe();
  }, []);

  // Busca local mais próximo do usuário
  const fetchLocalMaisProximo = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const localInfo = await axios.get(`${API_URL}/locais/local_mais_proximo?lat=${userCoords.latitude}&lng=-${userCoords.longitude}`);
        setLocalId(localInfo.data.id_local)
        setNomeLocal(localInfo.data.nome_local);
    } catch (error) {
      console.error('Erro ao buscar local mais próximo:', error);
    }
  };

  // Busca relatório do local e do usuário
  useEffect(() => {
    if (!localId || !userId) return;

    const fetchDados = async () => {
      try {
        const resLocal = await axios.get(`${API_URL}/relatorio/lixo-reciclado/${localId}`);
        setQtdLixo(resLocal.data.recycled_eletronics);

        const resUser = await axios.get(`${API_URL}/relatorio/lixo-reciclado/${userId}/${localId}`);
        setQtdUserLixo(resUser.data.recycled_eletronics);
      } catch (error) {
        console.error('Erro ao buscar dados do lixo reciclado:', error);
      }
    };

    fetchDados(); // primeira chamada
    const interval = setInterval(fetchDados, 10000); // a cada 10 segundos

    return () => clearInterval(interval); // limpa o intervalo ao desmontar
  }, [localId, userId]);


  // Atualiza pontos e eletrônicos a cada 60s
  useEffect(() => {
    const fetchAnalytics = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const USER_URL = `${API_URL}/relatorio/${user.uid}`;
        const response = await axios.get(USER_URL);
        const analytics = response.data;

        setPontosAcumulados(analytics.pontos);
        setRecycledEletronics(analytics.recycled_eletronics);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 10000); // Atualiza a cada 10s

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={general.container2}>

      {nomeLocal ?
        <>
          <Titulo text={`Dados da ${nomeLocal}`} />

          <View style={general.cardsContainer}>
            <Card descricao="Quantidade Total de Lixo Reciclado" quantidade={qtdLixo ?? 0} />
            <Card descricao="Quantidade que Você Reciclou" quantidade={qtdUserLixo ?? 0} />
          </View>
        </>
        :
        <Titulo text={"Carregando dados..."} />
      }

      <Titulo text="Bem vindo ao EcoTrash" />

      <View style={general.cardsContainer}>
        <Card descricao="Pontos Acumulados" quantidade={pontosAcumulados} />
        <Card descricao="Eletrônicos Reciclados" quantidade={recycledEletronics} />
      </View>
      
      <View style={{marginTop: 60, width: '100%'}}>
        <BotaoPrimario 
          style={{borderRadius: 100 }} 
          text="Reciclar" 
          onPress={() => navigation.navigate('Reciclar')} 
        />
      </View>
    </View>
  );
};

export default HomeScreen;

