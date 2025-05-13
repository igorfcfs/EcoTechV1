import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { general } from '../styles/index';
import { auth } from '../firebaseConfig';
import Card from '../components/CardEcoTrashs';
import axios from 'axios';
import { API_URL } from '../api';

const RelatorioScreen = () => {
  const [recycledEletronics, setRecycledEletronics] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [error, setError] = useState(null);
  
  const fetchAnalytics = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const USER_URL = API_URL + '/relatorio' + '/' + user.uid;
      console.log(USER_URL);
      const response = await axios.get(USER_URL);
      const analytics = response.data;

      setRecycledEletronics(analytics.recycled_eletronics);
      setPontos(analytics.pontos);
      console.log(analytics)
    } catch (err){
      console.error('Erro ao buscar eletrônicos:', err);
      setError(err.message || 'Erro ao carregar dados');
    }
  }

  useEffect(() => {
    const interval = setInterval(fetchAnalytics, 60000); // Atualiza a cada 5s
    fetchAnalytics(); // Chama imediatamente
    
    return () => clearInterval(interval);
  }, []);

  const pontosPorCategoria = {
  Pilhas: 5,
  Baterias: 10,
  Celulares: 100,
  Computadores: 150,
  Outros: 20,
};
  const relatorio = [
    { categoria: 'Pilhas', quantidade: 0, porcentagem: 0 },
    { categoria: 'Baterias', quantidade: 0, porcentagem: 0 },
    { categoria: 'Celulares', quantidade: 0, porcentagem: 0 },
    { categoria: 'Computadores', quantidade: 0, porcentagem: 0 },
    { categoria: 'Outros', quantidade: 0, porcentagem: 0 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Reciclagem</Text>

      <View style={general.cardsContainer}>
        <Card descricao="Pontos Acumulados" quantidade={pontos} />
        <Card descricao="Eletrônicos Reciclados" quantidade={recycledEletronics} />
      </View>

      <FlatList
        data={relatorio}
        keyExtractor={(item) => item.categoria}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.categoria}</Text>
            <Text style={styles.cardValue}>{item.quantidade}</Text>
            <Text style={styles.percentage}>
              {typeof item.porcentagem === 'number' 
                ? `${Number(item.porcentagem.toFixed(2))}% do total` 
                : item.porcentagem}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default RelatorioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  cardTotal: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3, // Sombras no Android
    shadowColor: '#000', // Sombras no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginVertical: 5,
  },
  percentage: {
    fontSize: 14,
    color: '#666',
  },
});
