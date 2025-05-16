import MapaScreen from './screens/Mapa';
import EcopontosScreen from './screens/Ecopontos';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native';
import { general } from './styles';

const Tab = createMaterialTopTabNavigator();

export default function RelatorioNavigation() {
  return (
    <SafeAreaView style={general.tabBar}>
      <Tab.Navigator screenOptions={{headerShown: false}}> 
        <Tab.Screen name="Mapa" component={MapaScreen} />
        <Tab.Screen name="Ecopontos" component={EcopontosScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
