import {
  BarChart, LineChart, Bar, Line,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function GraficoBase({ data, tipo, dataKeyX, dataKeyY, titulo }) {
  return (
    <div className="grafico-container">
      <h2>{titulo}</h2>
      <ResponsiveContainer width="100%" height="100%">
        {tipo === "bar" ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={dataKeyX} />
            <YAxis label={{ value: 'Valor', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKeyY} fill="#8884d8" name={dataKeyY} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey={dataKeyX} />
            <YAxis label={{ value: 'Valor', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKeyY} stroke="#82ca9d" name={dataKeyY} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoBase;
