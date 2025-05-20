import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../api';
import { auth } from '../firebaseConfig';
import { categorias, pontosPorCategoria } from '../data/Categorias';
import * as Location from 'expo-location';
import { colors, general } from '../styles';
import BotaoPrimario from '../components/BotaoPrimario';

export default function ReciclarScreen({ navigation }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [carregando, setCarregando] = useState(false);

  const verificarLixeira = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const validado = true; // Simula sucesso
        resolve(validado);
      }, 1500);
    });
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

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const localMaisProximo = await axios.get(`${API_URL}/locais/local_mais_proximo?lat=${userCoords.latitude}&lng=-${userCoords.longitude}`);
      const localDescarteId = localMaisProximo.data.id_local;
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={general.container} keyboardShouldPersistTaps="handled">
          <Text style={general.title}>Selecione a Categoria</Text>

          <View style={styles.grid}>
            {categorias.map((item) => (
              <TouchableOpacity
                key={item.nome}
                style={[
                  styles.card,
                  categoriaSelecionada === item.nome && general.cards.selected
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
              <Text style={general.textInputs.label}>Informe a quantidade:</Text>
              <TextInput
                style={general.textInputs.input}
                keyboardType="numeric"
                placeholder="Ex: 3"
                value={quantidade}
                onChangeText={setQuantidade}
              />

              {carregando ? (
                <ActivityIndicator size="large" color={colors.secundario} style={{ marginTop: 20 }} />
              ) : (
                <BotaoPrimario text="Confirmar Reciclagem" onPress={handleConfirmar} />
              )}
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
