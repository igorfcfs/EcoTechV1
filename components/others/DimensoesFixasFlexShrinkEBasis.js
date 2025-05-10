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
        {/*FLEX SHRINK -> flex-shrink: <número>, flex-basis: <número> - CAPACIDADE DE REDUÇÃO DE UM FLEX-ITEM*/}
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <View
            style={{
              flexShrink: 1,
              flexBasis: 300,
              backgroundColor: 'powderblue',
            }}
          />
          <View
            style={{
              flexShrink: 3,
              flexBasis: 300,
              backgroundColor: 'skyblue',
            }}
          />
          <View
            style={{
              flexShrink: 1,
              flexBasis: 300,
              backgroundColor: 'steelblue',
            }}
          />
        </View>

        {/*FLEX BASIS - INDICA O TAMANHO OFICIAL DO FLEX-ITEM*/}
      </View>
    );
  }
}

export default DimensoesFixas;
