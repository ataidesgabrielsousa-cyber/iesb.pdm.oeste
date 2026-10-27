import { Platform } from 'react-native';

let configured = false;

// Carrega o módulo só quando o lembrete é usado, para o app não quebrar ao abrir
async function getNotifications() {
  const Notifications = await import('expo-notifications');
  if (!configured) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    configured = true;
  }
  return Notifications;
}

async function requestPermission(Notifications) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.status === 'granted') return true;

  const result = await Notifications.requestPermissionsAsync();
  return result.status === 'granted';
}

export async function scheduleReminder(title, seconds) {
  try {
    const Notifications = await getNotifications();
    const granted = await requestPermission(Notifications);
    if (!granted) return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: 'Hora de revisar a tarefa no CampusGo.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        channelId: 'default',
      },
    });
    return true;
  } catch (error) {
    console.log('Notificação indisponível:', error);
    return false;
  }
}
