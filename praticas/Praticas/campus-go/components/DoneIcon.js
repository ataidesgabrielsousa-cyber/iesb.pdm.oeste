import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function DoneIcon({ trigger }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (trigger) {
      scale.value = withSequence(withSpring(1.4), withSpring(1));
    }
  }, [trigger]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={style}>
      <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
    </Animated.View>
  );
}
