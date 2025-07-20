// ✅ Arquivo principal do componente - GraficoBase.jsx
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
  Cell,
} from 'recharts';

import gerarCores from '../../utils/generateColors';
import TooltipCustom from './TooltipCustom';
import LegendaCustom from './LegendaCustom';
import { formatarData } from './utils';

import './GraficoBase.css';

function GraficoBase({ data, tipo, dataKeyX, dataKeyY, dataKeysY, titulo }) {
  const categorias = dataKeysY || (data && data.map((d) => d[dataKeyX]));
  const mapaCores = gerarCores(categorias || []);

  if (!data || data.length === 0) {
    return <p>Carregando dados ou nenhum dado disponível.</p>;
  }

  return (
    <div className="grafico-container">
      <h2>{titulo}</h2>
      <ResponsiveContainer width="100%" height="100%">
        {tipo === 'bar' ? (
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <CartesianGrid horizontal vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={dataKeyX}
              interval={0}
              angle={-30}
              textAnchor="end"
            />
            <YAxis
              label={{ value: 'Vendas', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<TooltipCustom />} />
            <Bar dataKey={dataKeyY} name="">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={mapaCores[entry[dataKeyX]] || '#ccc'}
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid horizontal vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={dataKeyX}
              tickFormatter={(value) => formatarData(value)}
            />
            <YAxis
              label={{ value: 'Vendas', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<TooltipCustom />} />
            <Legend content={<LegendaCustom mapaCores={mapaCores} />} />
            <Brush dataKey={dataKeyX} height={30} stroke="#8884d8" />
            {dataKeysY?.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={mapaCores[key] || '#ccc'}
                name={key}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoBase;