const cores = [
  '#4CAF50', // Verde (Botafogo)
  '#2196F3', // Azul (Flamengo)
  '#FFEB3B', // Amarelo (Laranjeiras)
  '#F44336', // Vermelho (Copacabana)
  '#9C27B0', // Roxo
  '#FF9800', // Laranja queimado
  '#00BCD4', // Ciano
  '#8BC34A', // Verde claro
  '#E91E63', // Rosa
  '#3F51B5', // Azul escuro
  '#CDDC39', // Verde lima
  '#FFC107', // Amarelo ouro
];

function gerarCores(keys) {
  const mapa = {};
  keys.forEach((key, index) => {
    mapa[key] = cores[index % cores.length];
  });
  return mapa;
}

export default gerarCores;
