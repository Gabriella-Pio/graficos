// hooks/useVendasAgrupadas.js
import useFetchData from './useFetchData';

// Hook específico que usa o genérico para buscar vendas agrupadas do backend
function useVendasAgrupadas(filtros = {}) {
  // Chama o hook genérico com a URL fixa da API de vendas agrupadas
  return useFetchData('http://localhost:8000/vendas/vendas/', filtros);
}

export default useVendasAgrupadas;