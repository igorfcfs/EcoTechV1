import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/Home';
import RelatorioNavigation from './RelatorioNavigation';
import LocalNavigation from './LocalNavigation';
import PerfilScreen from './screens/Perfil';
import ReciclarScreen from './screens/Reciclar';

const Tab = createBottomTabNavigator();

const CustomReciclarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.reciclarButtonContainer} onPress={onPress}>
    <View style={styles.reciclarButton}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function Rotas() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={24} color={focused ? '#8BC34A' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Relatório"
        component={RelatorioNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="clipboard-outline" size={24} color={focused ? '#8BC34A' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Reciclar"
        component={ReciclarScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icone-lixeira-central.png')} // substitua pelo nome correto se necessário
              resizeMode="cover"
              style={{ width: 90, height: 85, marginTop: 20 }}
            />
          ),
          tabBarButton: (props) => <CustomReciclarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Locais"
        component={LocalNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="map-outline" size={24} color={focused ? '#8BC34A' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-outline" size={24} color={focused ? '#8BC34A' : 'gray'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  reciclarButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reciclarButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#5D6A50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
  },
  reciclarIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 35, // Garante arredondamento da imagem também
    resizeMode: 'cover',
  },
});
