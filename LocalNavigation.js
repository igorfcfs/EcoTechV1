import MapaScreen from './screens/Mapa';
import EcopontosScreen from './screens/Ecopontos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //CRIA TODA A ESTRUTURA DO MENU

const Tab = createBottomTabNavigator();

export default function RelatorioNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}> 
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Ecopontos" component={EcopontosScreen} />
    </Tab.Navigator>
  );
}

