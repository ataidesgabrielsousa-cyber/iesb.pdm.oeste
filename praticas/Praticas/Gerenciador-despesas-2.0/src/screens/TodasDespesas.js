import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getTheme } from '../constants/theme';

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const colors = getTheme(useColorScheme());
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 300);

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter((expense) => expense.description.toLowerCase().includes(term));
  }, [expenses, debouncedSearch]);

  function openExpense(expenseId) {
    navigation.navigate('GerenciarDespesa', { expenseId });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        expenses={filteredExpenses}
        label="Total exibido"
        colors={colors}
        onItemPress={openExpense}
        emptyMessage={
          searchText.trim()
            ? 'Nenhum resultado para a busca.'
            : 'Nenhuma despesa. Toque em + para adicionar.'
        }
        header={
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar por descrição"
            placeholderTextColor={colors.subtext}
            style={[
              styles.search,
              { color: colors.text, backgroundColor: colors.card, borderColor: colors.border },
            ]}
          />
        }
      />
      <Pressable
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('GerenciarDespesa')}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});