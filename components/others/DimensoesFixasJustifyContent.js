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
        {/*JUSTIFY CONTENT - justificar flex-items - POSIÇÃO DOS ELEMENTOS
        1. justify-content: flex-start -> alinha os items ao INÍCIO do contêiner
        2. justify-content: center -> alinha os items ao CENTRO do contêiner
        3. justify-content: flex-end -> alinha os items ao FINAL do contêiner
        4. justify-content: space-between -> cria uma ESPAÇAMENTO IGUAL ENTRE os elementos, mantendo o primeiro grudado no início e o último no final.
        5. justify-content: space-around -> cria uma ESPAÇAMENTO ENTRE os elementos. Os espaçamentos do meio são 2 vezes maiores que o inicial e final. */}
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
