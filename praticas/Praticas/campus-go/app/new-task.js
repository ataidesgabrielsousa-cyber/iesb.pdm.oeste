import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function NewTask() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Fechar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
  button: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});
