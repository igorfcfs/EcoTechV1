/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
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
        {/*CSS INLINE: ESTILOS USADOS DENTRO DA TAG STYLE DO PRÓPRIO ELEMENTO -
        QUANDO MAIS DE UMA TAG FOR USAR O MESMO ESTILO ESTA PRÁTICA SE TORNA UMA
        MÁ PRÁTICA*/}
        {/*NO REACT NATIVE AS DIMENSÕES SÃO UNITLESS: SEM UNIDADE*/}

        {/*WIDTH E HEIGHT*/}
        <View
          style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
        />
        <View style={{ width: 100, height: 100, backgroundColor: 'skyblue' }} />
        <View
          style={{ width: 150, height: 150, backgroundColor: 'steelblue' }}
        />
        {/*PROPORÇÃO DO TAMANHO DO ELEMENTO NUNCA MUDA, OU SEJA, NÃO É RESPONSIVO*/}

        {/*FLEX DIRECTION - ORGANIZAR PELO EIXO PRINCIPAL (HORIZONTAL - MAIN-AXIS) E SECUNDÁRIO (VERTICAL - CROSS-AXIS)*/}
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row' /*/row-reverse/column/column-reverse*/,
            marginTop: 100,
          }}
        >
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
