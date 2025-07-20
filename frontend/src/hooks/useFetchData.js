// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

// Hook genérico para buscar dados de uma API com suporte a filtros (params)
function useFetchData(endpoint, params = {}) {
  const [data, setData] = useState(null); // Estado para armazenar os dados retornados da API
  const [carregando, setCarregando] = useState(true); // Estado que indica se os dados estão sendo carregados
  const [erro, setErro] = useState(null); // Estado para armazenar um erro, caso ocorra durante a requisição

  useEffect(() => { // Função assíncrona que realiza a requisição
    const fetch = async () => {
      try { // Faz a requisição GET com os parâmetros passados
        const response = await axios.get(endpoint, { params });
        setData(response.data || {}); // Armazena os dados retornados (ou um objeto vazio caso nulo)
      } catch (error) {
        setErro(error); // Em caso de erro, armazena o erro no estado
      } finally {
        setCarregando(false); // Marca que o carregamento terminou
      }
    };
    fetch();
  
  // Executa novamente a requisição se o endpoint ou os filtros mudarem
  }, [endpoint, JSON.stringify(params)]);

  // Retorna os dados, o estado de carregamento e erro para uso no componente
  return { data, carregando, erro };
}

export default useFetchData;
