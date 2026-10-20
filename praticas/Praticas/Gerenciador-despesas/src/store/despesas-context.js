import { createContext, useState } from 'react';
import { getDataMenosDias } from '../util/data';

const hoje = new Date();

const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Almoço no restaurante', valor: 35.9, data: getDataMenosDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Passagem de ônibus', valor: 12.5, data: getDataMenosDias(hoje, 2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Aplicativo de transporte', valor: 27.8, data: getDataMenosDias(hoje, 3), categoria: 'Transporte' },
  { id: 'd4', descricao: 'Cinema', valor: 48, data: getDataMenosDias(hoje, 4), categoria: 'Lazer' },
  { id: 'd5', descricao: 'Conta de luz', valor: 189.9, data: getDataMenosDias(hoje, 10), categoria: 'Contas' },
  { id: 'd6', descricao: 'Compras do mês', valor: 120.45, data: getDataMenosDias(hoje, 15), categoria: 'Alimentação' },
];

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: () => {},
  updateDespesa: () => {},
});

function DespesasContextProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function addDespesa(dados) {
    const id = Date.now().toString();
    setDespesas((atual) => [{ ...dados, id }, ...atual]);
  }

  function updateDespesa(id, dados) {
    setDespesas((atual) =>
      atual.map((despesa) => (despesa.id === id ? { ...despesa, ...dados } : despesa))
    );
  }

  const valor = { despesas, addDespesa, updateDespesa };

  return <DespesasContext.Provider value={valor}>{children}</DespesasContext.Provider>;
}

export default DespesasContextProvider;
