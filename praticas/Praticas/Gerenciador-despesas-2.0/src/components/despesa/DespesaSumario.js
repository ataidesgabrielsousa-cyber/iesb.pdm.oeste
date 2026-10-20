import { StyleSheet, Text, View } from 'react-native';
import { formatCurrency } from '../../utils/format';

export default function DespesaSumario({ count, total, label, colors }) {
  return (
    <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.subtext }]}>{label}</Text>
      <Text style={[styles.total, { color: colors.text }]}>{formatCurrency(total)}</Text>
      <Text style={{ color: colors.subtext }}>
        {count} {count === 1 ? 'despesa' : 'despesas'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: { fontSize: 13 },
  total: { fontSize: 24, fontWeight: '700', marginVertical: 4 },
});