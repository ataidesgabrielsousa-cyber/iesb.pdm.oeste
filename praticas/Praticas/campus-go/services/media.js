import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const options = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 };

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(options);
  if (result.canceled) return null;
  return result.assets[0].uri;
}

export async function takePhoto() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Câmera bloqueada',
      'Permita o acesso à câmera nos ajustes para tirar uma foto.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync(options);
  if (result.canceled) return null;
  return result.assets[0].uri;
}
