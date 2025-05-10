import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { auth } from '../firebaseConfig';
import { API_URL } from '../api';

export default function ReciclarScreen({ navigation }) {
  const [statusTampa, setStatusTampa] = useState('fechada');
  const [dataEnviada, setDataEnviada] = useState(false);

  useEffect(() => {
    setStatusTampa('abrindo');
  }, []);

  useEffect(() => {
    let timeout;

    switch (statusTampa) {
      case 'abrindo':
        timeout = setTimeout(() => setStatusTampa('aberta'), 3000);
        break;
      case 'fechando':
        timeout = setTimeout(() => setStatusTampa('fechada'), 3000);
        break;
      case 'escaneando_eletronico':
        timeout = setTimeout(() => setStatusTampa('enviando_dados'), 3000);
        break;
      case 'enviando_dados':
        timeout = setTimeout(() => setStatusTampa('dados_enviados'), 3000);
        break;
      default:
        break;
    }

    return () => clearTimeout(timeout);
  }, [statusTampa]);

  useEffect(() => {
    if (statusTampa === 'fechada') {
      const timeout = setTimeout(() => setStatusTampa('escaneando_eletronico'), 1000);
      return () => clearTimeout(timeout);
    }
  }, [statusTampa]);

  useEffect(() => {
    if (statusTampa === 'enviando_dados' && !dataEnviada) {
      fetchData();
    }
  }, [statusTampa]);

  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const dadosEletronico = {
        uid: user.uid,
        categoria: 'Celular',
        marca: 'Samsung',
        modelo: 'M54',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAzIZ98iOc06QSQV9ge6qJNG4_pCG2lo1UcuMI-XbT7jadFry_eH9ukFiey9ULagrtEY&usqp=CAU',
        localDescarte: 'JWTYvvXQf8ytR1gKMPTfP',
        pontos: 100
      };

      const response = await axios.post(`${API_URL}/eletronicos`, dadosEletronico);

      if (response.status === 200 || response.status === 201) {
        setDataEnviada(true);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error.response?.data || error.message);
    }
  };

  const resetarCiclo = () => {
    setDataEnviada(false);
    navigation.goBack();
    alert("Eletrônico novo em relatório");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Status da Lixeira</Text>

      <View style={styles.statusBox}>
        {statusTampa === 'abrindo' && (
          <>
            <ActivityIndicator size="large" color="#1B5E20" />
            <Text style={styles.statusTexto}>Abrindo a tampa...</Text>
          </>
        )}

        {statusTampa === 'aberta' && (
          <>
            <Entypo name="lock-open" size={30} color="#1B5E20" />
            <Text style={styles.statusAberta}>Tampa aberta</Text>
            <Text style={styles.instrucao}>Insira seu eletrônico na lixeira</Text>
            <View style={styles.botao}>
              <Button title="Eletrônico Inserido" onPress={() => setStatusTampa('fechando')} color="#1B5E20" />
            </View>
          </>
        )}

        {statusTampa === 'fechando' && (
          <>
            <ActivityIndicator size="large" color="#1B5E20" />
            <Text style={styles.statusTexto}>Fechando a tampa...</Text>
          </>
        )}

        {statusTampa === 'fechada' && (
          <>
            <Ionicons name="lock-closed" size={30} color="#1B5E20" />
            <Text style={styles.statusAberta}>Tampa fechada</Text>
            <ActivityIndicator size="large" color="#1B5E20" />
            <Text style={styles.instrucao}>Analisando eletrônico...</Text>
          </>
        )}

        {statusTampa === 'escaneando_eletronico' && (
          <>
            <ActivityIndicator size="large" color="#1B5E20" />
            <Text style={styles.statusTexto}>Escaneando eletrônico...</Text>
          </>
        )}

        {statusTampa === 'enviando_dados' && (
          <>
            <ActivityIndicator size="large" color="#1B5E20" />
            <Text style={styles.statusTexto}>Enviando dados do eletrônico...</Text>
          </>
        )}

        {statusTampa === 'dados_enviados' && (
          <>
            <Feather name="check-circle" size={64} color="#1B5E20" />
            <Text style={styles.statusTexto}>
              Tudo Ok! Muito obrigado por contribuir com a Unibient, o planeta agradece!
            </Text>
            <View style={styles.botao}>
              <Button title="Voltar" onPress={resetarCiclo} color="#1B5E20" />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2E7D32',
  },
  statusBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
  statusTexto: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  statusAberta: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  instrucao: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  botao: {
    marginTop: 10,
    width: '100%',
  },
});
