// 📁 components/GraficoBase/TooltipCustom.jsx
import { parseISO, format, isValid } from 'date-fns';

// Componente de tooltip personalizado para mostrar dados com data formatada
function TooltipCustom({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  let labelFormatado = label;
  const parsedDate = parseISO(label);
  if (isValid(parsedDate)) {
    labelFormatado = format(parsedDate, 'dd/MM/yy');
  }

  return (
    <div
      style={{
        background: '#222',
        border: '1px solid #444',
        padding: 10,
        borderRadius: 4,
        fontSize: 13,
        color: '#f0f0f0',
      }}
    >
      <strong>{labelFormatado}</strong>
      <ul style={{ paddingLeft: 0, margin: '5px 0' }}>
        {payload.map((entry, index) => (
          <li key={index} style={{ listStyle: 'none', marginBottom: 2 }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                backgroundColor: entry.color,
                marginRight: 5,
                borderRadius: '50%',
              }}
            />
            {entry.name}: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TooltipCustom;