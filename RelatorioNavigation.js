import RelatorioGeralScreen from './screens/RelatorioGeral';
import RelatorioEletronicosScreen from './screens/RelatorioEletronicos';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function RelatorioNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}> 
      <Tab.Screen name="Geral" component={RelatorioGeralScreen} />
      <Tab.Screen name="Eletrônicos" component={RelatorioEletronicosScreen} />
    </Tab.Navigator>
  );
}

