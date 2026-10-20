import { useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getTheme } from '../constants/theme';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const colors = getTheme(useColorScheme());

  const recentExpenses = useMemo(() => {
    const limit = Date.now() - SEVEN_DAYS_MS;
    return expenses.filter((expense) => new Date(expense.date).getTime() >= limit);
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        expenses={recentExpenses}
        label="Total dos últimos 7 dias"
        colors={colors}
        onItemPress={(expenseId) => navigation.navigate('GerenciarDespesa', { expenseId })}
        emptyMessage="Nenhuma despesa nos últimos 7 dias."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});