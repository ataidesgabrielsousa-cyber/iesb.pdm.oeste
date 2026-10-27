import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY)
      .then((uri) => setPhoto(uri))
      .catch(() => {});
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhoto(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a foto.');
    }
  }

  async function handlePick() {
    try {
      await savePhoto(await pickImage());
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  }

  async function handleCamera() {
    try {
      await savePhoto(await takePhoto());
    } catch {
      Alert.alert('Erro', 'Não foi possível usar a câmera.');
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePick} style={styles.avatar}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <Ionicons name="person" size={60} color="#2563EB" />
        )}
      </Pressable>
      <Text style={styles.hint}>Toque no avatar para escolher uma foto</Text>

      <Pressable style={styles.button} onPress={handleCamera}>
        <Text style={styles.buttonText}>Tirar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { width: 120, height: 120, borderRadius: 60 },
  hint: { marginTop: 12, color: '#6B7280' },
  button: { marginTop: 24, backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});
