import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BotaoPrimario from '../components/BotaoPrimario';
import Titulo from '../components/Titulo';
import Card from '../components/CardEcoTrashs'
import { general } from '../styles/index';
import { auth } from '../firebaseConfig';
import axios from 'axios';
import { API_URL } from '../api';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Dados de exemplo (podem ser substituídos por dados reais via props ou state)
  const [pontosAcumulados, setPontosAcumulados] = useState(0);
  const [recycledEletronics, setRecycledEletronics] = useState(0);

  const fetchAnalytics = async () => {
    const user = auth.currentUser;
    if (!user) return;

    console.log(`Monitorando dados para o usuário: ${user.uid}`);
    
    const USER_URL = API_URL + '/relatorio' + '/' + user.uid;
    console.log(USER_URL);
    const response = await axios.get(USER_URL);
    const analytics = response.data;
    setPontosAcumulados(analytics.pontos);
    setRecycledEletronics(analytics.recycled_eletronics);
  }

  useEffect(() => {
    const interval = setInterval(fetchAnalytics, 60000); // Atualiza a cada 5s
    fetchAnalytics(); // Chama imediatamente
    
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={general.container2}>
      <Titulo text="Bem vindo ao EcoTrash" />
      
      <View style={general.cardsContainer}>
        <Card descricao="Pontos Acumulados" quantidade={pontosAcumulados} />
        <Card descricao="Eletrônicos Reciclados" quantidade={recycledEletronics} />
      </View>
      
      <BotaoPrimario text="Ver Mapa" onPress={() => navigation.navigate('Mapa')} />
      <BotaoPrimario text="Ver Relatório" onPress={() => navigation.navigate('Relatório')} />
      <BotaoPrimario text="Ver Perfil" onPress={() => navigation.navigate('Perfil')} />
      <View style={{marginTop: 60, width: '100%'}}>
        <BotaoPrimario style={{backgroundColor: 'lightgreen', borderRadius: 100}} text='Reciclar' onPress={() => navigation.navigate('Reciclar')} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
});
