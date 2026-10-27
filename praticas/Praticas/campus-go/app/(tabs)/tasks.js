import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import DoneIcon from '../../components/DoneIcon';

const TASKS = [
  { id: '7', title: 'Entregar relatório' },
  { id: '42', title: 'Revisar slides da aula' },
  { id: '90', title: 'Estudar para a prova' },
];

export default function Tasks() {
  const [place, setPlace] = useState(null);
  const [done, setDone] = useState(false);

  async function handleCheckIn() {
    try {
      const found = await getCurrentPlace();
      if (!found) {
        Alert.alert('Sem permissão', 'Permita o acesso à localização para fazer check-in.');
        return;
      }
      setPlace(found.label);
    } catch {
      Alert.alert('Erro', 'Não foi possível obter o local agora.');
    }
  }

  async function handleReminder() {
    const scheduled = await scheduleReminder('Tarefa do CampusGo', 10);
    if (scheduled) {
      Alert.alert('Lembrete agendado', 'Você recebe uma notificação em 10 segundos.');
    } else {
      Alert.alert('Sem permissão', 'Ative as notificações para receber lembretes.');
    }
  }

  async function handleDone() {
    setDone(true);
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // No emulador a vibração pode não funcionar; o app segue normalmente.
    }
    Alert.alert('Tarefa concluída', 'Boa! Mais uma no histórico.');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.button} onPress={() => router.push('/new-task')}>
        <Text style={styles.buttonText}>Nova tarefa</Text>
      </Pressable>

      <Text style={styles.section}>Suas tarefas</Text>
      {TASKS.map((task) => (
        <Pressable
          key={task.id}
          style={styles.taskCard}
          onPress={() => router.push(`/task/${task.id}`)}
        >
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskLink}>Abrir</Text>
        </Pressable>
      ))}

      <Text style={styles.section}>Ações</Text>
      <Pressable style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>Estudei aqui</Text>
      </Pressable>
      {place ? <Text style={styles.place}>{place}</Text> : null}

      <Pressable style={styles.button} onPress={handleReminder}>
        <Text style={styles.buttonText}>Lembrar em 10 s</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.success]} onPress={handleDone}>
        <Text style={styles.buttonText}>Concluir</Text>
      </Pressable>
      <View style={styles.doneIcon}>
        <DoneIcon trigger={done} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 12 },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  taskTitle: { fontSize: 16, fontWeight: '600' },
  taskLink: { color: '#2563EB', fontWeight: '600' },
  button: { backgroundColor: '#2563EB', padding: 14, borderRadius: 10, alignItems: 'center' },
  success: { backgroundColor: '#16A34A' },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  place: { textAlign: 'center', color: '#374151' },
  doneIcon: { alignItems: 'center', marginTop: 8 },
});
