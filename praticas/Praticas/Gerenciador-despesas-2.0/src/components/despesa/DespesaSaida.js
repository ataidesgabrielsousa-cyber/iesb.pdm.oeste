import { View } from 'react-native';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({ expenses, label, colors, onItemPress, header, emptyMessage }) {
  const total = expenses.reduce((soma, despesa) => soma + despesa.amount, 0);

  return (
    <DespesaLista
      expenses={expenses}
      colors={colors}
      onItemPress={onItemPress}
      emptyMessage={emptyMessage}
      ListHeaderComponent={
        <View>
          {header}
          <DespesaSumario count={expenses.length} total={total} label={label} colors={colors} />
        </View>
      }
    />
  );
}