const [localMaisProximo, setLocalMaisProximo] = useState(null);
const [nomeLocal, setNomeLocal] = useState('');

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
      if (locaisProximos.length === 0) return null;

      locaisProximos.sort((a, b) => a.distancia - b.distancia);
      return locaisProximos[0].id;
    } catch (error) {
      console.error('Erro ao obter local de descarte:', error);
      return null;
    }
};

const fetchLocalMaisProximo = async () => {
    const local = await getLocalDescarteMaisProximo();
    setLocalMaisProximo(local);
};

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

fetchLocalMaisProximo();
fetchLocalNome();

export default localMaisProximo;