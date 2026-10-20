import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';

export default function DespesaLista({
  expenses,
  colors,
  onItemPress,
  ListHeaderComponent,
  emptyMessage,
}) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem expense={item} colors={colors} onPress={onItemPress} />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={56} color={colors.subtext} />
          <Text style={[styles.emptyText, { color: colors.subtext }]}>{emptyMessage}</Text>
        </View>
      }
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 100 },
  empty: { alignItems: 'center', marginTop: 60, paddingHorizontal: 24 },
  emptyText: { fontSize: 15, textAlign: 'center', marginTop: 12 },
});