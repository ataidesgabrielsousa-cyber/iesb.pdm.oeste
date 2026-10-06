import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../util/categorias';
import { filtrarPorCategoria } from '../util/filtros';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';

function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);
  const periodo = categoriaFiltro === 'Todas' ? 'Total' : `Total: ${categoriaFiltro}`;

  return (
    <View style={styles.container}>
      <CategoriaSeletor
        opcoes={['Todas', ...CATEGORIAS]}
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={periodo}
        textoVazio="Nenhuma despesa nesta categoria."
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
