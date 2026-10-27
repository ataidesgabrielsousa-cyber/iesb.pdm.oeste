import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({});
  const [address] = await Location.reverseGeocodeAsync(position.coords);

  const label = address
    ? [address.street, address.district, address.city].filter(Boolean).join(', ')
    : '';

  return {
    label:
      label ||
      `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`,
    coords: position.coords,
  };
}
