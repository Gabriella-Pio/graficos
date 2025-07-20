// 📁 components/GraficoBase/utils.js
import { parseISO, format, isValid } from 'date-fns';

// Função utilitária para formatar datas do eixo X ou da tooltip
export function formatarData(valor) {
  const parsed = parseISO(valor);
  return isValid(parsed) ? format(parsed, 'dd/MM/yy') : valor;
}
