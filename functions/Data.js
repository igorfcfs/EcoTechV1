const categorias = [
  { nome: 'Pilhas', imagem: require('../assets/pilhas.png') },
  { nome: 'Baterias', imagem: require('../assets/baterias.png') },
  { nome: 'Celulares', imagem: require('../assets/celulares.png') },
  { nome: 'Computadores', imagem: require('../assets/computadores.png') },
  { nome: 'Outros', imagem: require('../assets/outros.png') },
];

const pontosPorCategoria = {
  Pilhas: 5,
  Baterias: 10,
  Celulares: 100,
  Computadores: 150,
  Outros: 20,
};

export {categorias, pontosPorCategoria};