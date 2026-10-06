import { FlatList } from 'react-native';
import DespesaItem from './DespesaItem';

function renderDespesaItem({ item }) {
  return <DespesaItem {...item} />;
}

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={renderDespesaItem}
    />
  );
}

export default DespesaLista;
