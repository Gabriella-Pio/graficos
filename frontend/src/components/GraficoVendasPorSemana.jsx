import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function GraficoVendasPorSemana() {
  const [dados, setDados] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/vendas/semana/')
      .then(response => {
        setDados(response.data);

        // Detecta todos os bairros presentes
        const todosBairros = new Set();
        response.data.forEach(reg => {
          Object.keys(reg).forEach(chave => {
            if (chave !== 'semana') {
              todosBairros.add(chave);
            }
          });
        });

        setBairros(Array.from(todosBairros));
      })
      .catch(error => console.error("Erro ao buscar dados por semana:", error));
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Venda de Imóveis por Semana</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="semana" />
          <YAxis />
          <Tooltip />
          <Legend />
          {bairros.map((bairro, index) => (
            <Line
              key={bairro}
              type="monotone"
              dataKey={bairro}
              stroke={['#8884d8', '#82ca9d', '#ff7300', '#0088FE', '#FF8042'][index % 5]}
              name={bairro}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoVendasPorSemana;
