import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatCurrency, formatDate } from '../../utils/format';

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  android: { elevation: 3 },
  default: {},
});

export default function DespesaItem({ expense, colors, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(expense.id)}
      style={({ pressed }) => [
        styles.card,
        shadow,
        { backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: colors.text }]}>{expense.description}</Text>
        <Text style={[styles.meta, { color: colors.subtext }]}>
          {expense.category} • {formatDate(expense.date)}
        </Text>
      </View>
      <Text style={[styles.amount, { color: colors.primary }]}>{formatCurrency(expense.amount)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  info: { flex: 1, marginRight: 12 },
  description: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 13, marginTop: 4 },
  amount: { fontSize: 16, fontWeight: '700' },
});