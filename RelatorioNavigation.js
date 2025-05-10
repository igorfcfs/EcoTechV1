import RelatorioGeralScreen from './screens/RelatorioGeral';
import RelatorioEletronicosScreen from './screens/RelatorioEletronicos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //CRIA TODA A ESTRUTURA DO MENU

const Tab = createBottomTabNavigator();

export default function RelatorioNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}> 
      <Tab.Screen name="Geral" component={RelatorioGeralScreen} />
      <Tab.Screen name="Eletrônicos" component={RelatorioEletronicosScreen} />
    </Tab.Navigator>
  );
}

