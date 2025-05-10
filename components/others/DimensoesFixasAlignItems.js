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
        {/*ALIGN ITEMS - DISTRIBUIÇÃO DOS ELEMENTOS NO CONTAINER
        1. align-item: stretch -> valor padrão, que faz com que os flex-items cresçam igualmente
        2. align-item: flex-start -> alinha os itens ao INÍCIO
        3. align-item: flex-end -> alinha os itens ao FINAL
        4. align-item: center -> alinha os itens ao CENTRO
        5. align-item: baseline -> alinha os itens de acordo com a linha base da tipografia */}
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <View style={{ height: 50, backgroundColor: 'powderblue' }} />
          <View style={{ height: 50, backgroundColor: 'skyblue' }} />
          <View style={{ height: 50, backgroundColor: 'steelblue' }} />
        </View>
      </View>
    );
  }
}

export default DimensoesFixas;
