import { useEffect, useState } from 'react';
import axios from 'axios';
import GraficoBase from './GraficoBase';
import './css/GraficoVendas.css'; // mesmo CSS

function GraficoVendasPorBairro() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/vendas/bairro/')
      .then(response => setDados(response.data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <GraficoBase
      data={dados}
      tipo="bar"
      dataKeyX="bairro"
      dataKeyY="quantidade"
      titulo="Venda de Imóveis por Bairro"
    />
  );
}

export default GraficoVendasPorBairro;
