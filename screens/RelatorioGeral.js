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
  const [dadosCategoria, setDadosCategoria] = useState(null);
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
      setDadosCategoria(analytics.por_categoria);
      console.log(analytics)
    } catch (err){
      console.error('Erro ao buscar eletrônicos:', err);
      setError(err.message || 'Erro ao carregar dados');
    }
  }

  useEffect(() => {
    const interval = setInterval(fetchAnalytics, 5000); // Atualiza a cada 5s
    fetchAnalytics(); // Chama imediatamente
    
    return () => clearInterval(interval);
  }, []);

  const quantidade = dadosCategoria ? {
    pilhas: dadosCategoria["Pilhas"]?.quantidade || 0,
    baterias: dadosCategoria["Baterias"]?.quantidade || 0,
    celulares: dadosCategoria["Celulares"]?.quantidade || 0,
    computadores: dadosCategoria["Computadores"]?.quantidade || 0,
    outros: dadosCategoria["Outros"]?.quantidade || 0
  } : {};

  const porcentagem = dadosCategoria ? {
    pilhas: dadosCategoria["Pilhas"]?.porcentagem || 0,
    baterias: dadosCategoria["Baterias"]?.porcentagem || 0,
    celulares: dadosCategoria["Celulares"]?.porcentagem || 0,
    computadores: dadosCategoria["Computadores"]?.porcentagem || 0,
    outros: dadosCategoria["Outros"]?.porcentagem || 0
  } : {};


  const pontosPorCategoria = {
    Pilhas: 5,
    Baterias: 10,
    Celulares: 100,
    Computadores: 150,
    Outros: 20,
  };
  
  const relatorioCompleto = [
    { categoria: 'Pilhas', quantidade: quantidade.pilhas, porcentagem: porcentagem.pilhas },
    { categoria: 'Baterias', quantidade: quantidade.baterias, porcentagem: porcentagem.baterias },
    { categoria: 'Celulares', quantidade: quantidade.celulares, porcentagem: porcentagem.celulares },
    { categoria: 'Computadores', quantidade: quantidade.computadores, porcentagem: porcentagem.computadores },
    { categoria: 'Outros', quantidade: quantidade.outros, porcentagem: porcentagem.outros },
  ];

  const relatorio = relatorioCompleto.filter(item => item.quantidade > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Reciclagem</Text>

      <View style={general.cardsContainer}>
        <Card descricao="Pontos Acumulados" quantidade={pontos} />
        <Card descricao="Eletrônicos Reciclados" quantidade={recycledEletronics} />
      </View>
      
      {dadosCategoria !== 0 ? (
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
      ) : (
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.tipo}>Nenhum eletrônico reciclado ainda</Text>
            <Text style={styles.marcaModelo}>
              Quando você reciclar, os dados aparecerão aqui 😄
            </Text>
          </View>
        </View>
      )}

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
