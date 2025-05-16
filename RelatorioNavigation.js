import RelatorioGeralScreen from './screens/RelatorioGeral';
import { SafeAreaView } from 'react-native';
import RelatorioEletronicosScreen from './screens/RelatorioEletronicos';
import { general } from './styles';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function RelatorioNavigation() {
  return (
    <SafeAreaView style={general.tabBar}>
      <Tab.Navigator screenOptions={{headerShown: false}}> 
        <Tab.Screen name="Geral" component={RelatorioGeralScreen} />
        <Tab.Screen name="Eletrônicos" component={RelatorioEletronicosScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
