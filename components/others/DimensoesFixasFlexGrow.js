/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';

//FLEXBOX

/* COMPONENTE BASEADO EM CLASSE
- SABEM ADMINISTRAR DADOS (SABEM SOBRE A INTERAÇÃO QUE É FEITA NELE)
- NÃO DECLARATIVOS -> SABEM LIDAR COM ESTADOS (NÃO É PRECISO O USO DE REACT HOOKS)
*/
class DimensoesFixas extends React.Component {
  render() {
    return (
      <View>
        {/*FLEX GROW -> flex-grow: <número> - CAPACIDADE DE CRESCIMENTO DE UM FLEX-ITEM*/}
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <View style={{ flexGrow: 1, backgroundColor: 'powderblue' }} />
          <View style={{ flexGrow: 2, backgroundColor: 'skyblue' }} />
          <View style={{ flexGrow: 1, backgroundColor: 'steelblue' }} />
        </View>
      </View>
    );
  }
}

export default DimensoesFixas;
