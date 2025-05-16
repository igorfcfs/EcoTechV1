import MapaScreen from './screens/Mapa';
import EcopontosScreen from './screens/Ecopontos';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function RelatorioNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}> 
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Ecopontos" component={EcopontosScreen} />
    </Tab.Navigator>
  );
}

