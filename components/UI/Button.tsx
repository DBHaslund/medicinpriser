import { Pressable, StyleSheet, Text } from 'react-native';

import { ButtonProps } from '../../constants/types';
import { Colors } from '../../constants/colors';

export default function Button({ children, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
