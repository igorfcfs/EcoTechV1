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
        {/* FLEX WRAP - QUEBRAR LINHAS NO CONTAINER
        1. flex-wrap: nowrap -> VALOR PADRÃO, não permite a quebra de linha
        2. flex-wrap: wrap -> quebra a linha assim que um dos flex-items não puder mais ser compactado.
        3. flex-wrap: wrap-reverse -> quebra a linha assim que um dos flex-items não puder mais ser compactado. A quebra é na direção contrária, ou seja, para a linha acima
        */}
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column/row',
            flexWrap: 'wrap',
          }}
        >
          <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
          />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View
            style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}
          />

          <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
          />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View
            style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}
          />

          <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
          />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View
            style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}
          />

          <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
          />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View
            style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}
          />

          <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
          />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View
            style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}
          />

          <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
          />
          <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
          <View
            style={{ width: 50, height: 50, backgroundColor: 'steelblue' }}
          />
        </View>
      </View>
    );
  }
}

export default DimensoesFixas;
