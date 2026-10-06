import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../util/categorias';
import { getDataMenosDias } from '../util/data';
import { filtrarPorCategoria } from '../util/filtros';
import CategoriaSeletor from '../components/despesa/CategoriaSeletor';
import DespesaSaida from '../components/despesa/DespesaSaida';

function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const limite = getDataMenosDias(new Date(), 7);
  const despesasRecentes = despesas.filter((despesa) => despesa.data >= limite);
  const despesasFiltradas = filtrarPorCategoria(despesasRecentes, categoriaFiltro);

  return (
    <View style={styles.container}>
      <CategoriaSeletor
        opcoes={['Todas', ...CATEGORIAS]}
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Últimos 7 dias"
        textoVazio="Nenhuma despesa nos últimos 7 dias."
      />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
