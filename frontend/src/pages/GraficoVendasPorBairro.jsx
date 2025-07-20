// 📁 pages/GraficoVendasPorBairro.jsx
import GraficoBase from '../components/GraficoBase/GraficoBase';
import useVendasAgrupadas from '../hooks/useVendasAgrupadas';

function GraficoVendasPorBairro({ filtros }) {
  const { data, carregando, erro } = useVendasAgrupadas(filtros);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro ao carregar dados: {erro.message}</p>;

  const dadosBairro = data?.por_bairro ?? [];
  const bairros = dadosBairro.map((d) => d.bairro);

  return (
    <GraficoBase
      data={dadosBairro}
      tipo="bar"
      dataKeyX="bairro"
      dataKeyY="quantidade"
      dataKeysY={bairros} // usado para o mapa de cores
      titulo="Venda de Imóveis por Bairro"
    />
  );
}

export default GraficoVendasPorBairro;