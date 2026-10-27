import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((soma, despesa) => soma + despesa.amount, 0);

  async function handleShare() {
    await Share.share({
      message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Text style={styles.count}>
        {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
      </Text>

      <Pressable style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Compartilhar resumo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  label: { fontSize: 16, color: '#6B7280' },
  total: { fontSize: 36, fontWeight: '700', marginVertical: 8 },
  count: { color: '#6B7280', marginBottom: 24 },
  button: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});
