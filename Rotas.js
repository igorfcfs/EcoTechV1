import HomeScreen from './screens/Home';
import RelatorioNavigation from './RelatorioNavigation'
import MapaScreen from './screens/Mapa';
import PerfilScreen from './screens/Perfil';
import { createDrawerNavigator } from '@react-navigation/drawer'; //CRIA TODA A ESTRUTURA DO MENU

/*NAVEGAÇÃO - O APP.JS SE TORNA O MENU
- DEPENDÊNCIAS:
  - npm install @react-navigation/native
  - npx expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
- POR MENU LATERAL (DRAWER NAVIGATION)
  - importação: npm install --save @react-navigation/drawer
- POR LINKS (STACK/STACK NATIVE NAVIGATION) - NAVEGADOR POR PILHA (EMPILHAGEM DE PÁGINAS/TELAS) - por meio de links e botões variáveis/fixos
  - Pilha em Ciências da Computação é uma estrutura de dados do tipo LIFO (Last in, First out) - O 1º que entra é o 1º que sai
  - importação: npm install --save @react-navigation/stack
- POR ABAS (BOTTOM TABS/MATERIAL TOP TABS NAVIGATION) - por meio de abas inferiores/superiores
*/

const Drawer = createDrawerNavigator();

{/*COMPONENTE QUE CONSTRÓI O MENU*/}
export default function Rotas() {
  return (
    <Drawer.Navigator> 
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Relatório" component={RelatorioNavigation} />
      <Drawer.Screen name="Mapa" component={MapaScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}

