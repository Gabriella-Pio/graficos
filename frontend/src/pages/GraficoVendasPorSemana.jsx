// 📁 pages/GraficoVendasPorSemana.jsx
import GraficoBase from '../components/GraficoBase/GraficoBase';
import useVendasAgrupadas from '../hooks/useVendasAgrupadas';

function GraficoVendasPorSemana({ filtros }) {
  const { data, carregando, erro } = useVendasAgrupadas(filtros);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro.message}</p>;

  const dadosSemana = data?.por_semana ?? [];
  const bairros = dadosSemana.length > 0
    ? Object.keys(dadosSemana[0]).filter((chave) => chave !== 'semana')
    : [];

  return (
    <GraficoBase
      data={dadosSemana}
      tipo="line"
      dataKeyX="semana"
      dataKeysY={bairros} // múltiplas linhas
      titulo="Vendas de Imóveis por Semana"
    />
  );
}

export default GraficoVendasPorSemana;