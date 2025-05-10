import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';
import EletronicoCard from '../components/EletronicoCard';
import Titulo from '../components/Titulo';
import { general } from '../styles/index';
import { auth } from '../firebaseConfig';
import BotaoPrimario from '../components/BotaoPrimario';
import { API_URL } from '../api';

const RelatorioScreen = ({ navigation }) => {
  const [eletronicos, setEletronicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEletronicos = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/eletronicos`);
      const userEletronicos = response.data.filter(item => item.uid === user.uid);
      setEletronicos(userEletronicos);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar eletrônicos:', err);
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchEletronicos, 5000); // Atualiza a cada 5s
    fetchEletronicos(); // Chama imediatamente
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={[general.container3, { justifyContent: 'center', alignItems: 'center' }]}>
        <Titulo text="Relatório de Eletrônicos" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[general.container3, { justifyContent: 'center', alignItems: 'center' }]}>
        <Titulo text="Relatório de Eletrônicos" />
        <Text style={{ color: 'red', marginBottom: 20 }}>Erro: {error}</Text>
        <BotaoPrimario 
          text="Tentar novamente" 
          onPress={fetchEletronicos} 
        />
      </View>
    );
  }

  return (
    <View style={general.container3}>
      <Titulo text="Relatório de Eletrônicos" />

      {eletronicos.length === 0 ? (
        <EletronicoCard vazio />
      ) : (
        <FlatList
          data={eletronicos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EletronicoCard item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <BotaoPrimario text="+" onPress={() => navigation.navigate('Reciclar')} />
    </View>
  );
};

export default RelatorioScreen;