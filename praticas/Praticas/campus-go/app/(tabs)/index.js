import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useNotices from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }

  if (isLoading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Não foi possível carregar os avisos.</Text>
        <Text style={styles.muted}>{error}</Text>
        <Pressable style={styles.button} onPress={() => reload()}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListEmptyComponent={
        <Text style={styles.empty}>Nenhum aviso por enquanto. Puxe a lista para atualizar.</Text>
      }
      renderItem={({ item }) => (
        <FadeIn style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, textTransform: 'capitalize' },
  cardBody: { fontSize: 14, color: '#4B5563' },
  errorTitle: { fontSize: 16, fontWeight: '700', color: '#DC2626', textAlign: 'center' },
  muted: { color: '#6B7280', textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 40, color: '#6B7280' },
  button: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});
