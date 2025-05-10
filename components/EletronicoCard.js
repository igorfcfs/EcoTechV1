import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EletronicoCard({ item, vazio }) {
  const [nomeLocal, setNomeLocal] = useState('Buscando...');

  useEffect(() => {
    const fetchLocalNome = async () => {
      if (item?.localDescarte) {
        try {
          const docRef = doc(db, 'locations', item.localDescarte); // nome da sua collection
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNomeLocal(docSnap.data().nome || 'Sem nome');
          } else {
            setNomeLocal('Local não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar local:', error);
          setNomeLocal('Erro ao buscar local');
        }
      } else {
        setNomeLocal('Sem local');
      }
    };

    fetchLocalNome();
  }, [item.localDescarte]);

  if (vazio) {
    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.tipo}>Nenhum eletrônico reciclado ainda</Text>
          <Text style={styles.marcaModelo}>
            Quando você reciclar, os dados aparecerão aqui 😄
          </Text>
        </View>
      </View>
    );
  }

  // Função para converter qualquer formato de timestamp para Date
  const parseDate = (timestamp) => {
    if (!timestamp) return null;
    
    // Se for um objeto Firestore Timestamp
    if (typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    
    // Se for um objeto {_seconds, _nanoseconds} (seu caso)
    if (timestamp._seconds && timestamp._nanoseconds) {
      return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    }
    
    // Se for um objeto {seconds, nanoseconds} (sem underline)
    if (timestamp.seconds && timestamp.nanoseconds) {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    
    // Se for uma string ISO
    if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    
    // Se já for um objeto Date
    if (timestamp instanceof Date) {
      return timestamp;
    }
    
    return null;
  };

  const dateObject = parseDate(item.criadoEm);
  const dataFormatada = dateObject 
    ? dateObject.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) 
    : 'Data desconhecida';

  return (
    <View style={styles.card}>
      {item.foto && <Image source={{ uri: item.foto }} style={styles.image} />}
      <View style={styles.info}>
        <Text style={styles.tipo}>{item.categoria}</Text>
        <Text style={styles.marcaModelo}>{item.marca} - {item.modelo}</Text>
        <View style={styles.materiais}>
          <Text style={styles.material}>🗓️ Reciclado em: {dataFormatada}</Text>
          <Text style={styles.material}>📍 Local: {nomeLocal}</Text>
          <Text style={styles.material}>Pontos: {item.pontos || 0}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  marcaModelo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  materiais: {
    gap: 4,
  },
  material: {
    fontSize: 13,
    color: '#444',
  },
});