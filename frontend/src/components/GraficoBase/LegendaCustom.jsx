// 📁 components/GraficoBase/LegendaCustom.jsx
// Componente de legenda personalizada com cores correspondentes ao bairro ou série
function LegendaCustom({ payload, mapaCores }) {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 10 }}>
      {payload.map((entry, index) => (
        <li key={index} style={{ display: 'inline-block', marginRight: 15 }}>
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              backgroundColor: mapaCores[entry.value] || '#ccc',
              marginRight: 5,
              borderRadius: '50%',
            }}
          ></span>
          <span style={{ fontSize: 14 }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default LegendaCustom;