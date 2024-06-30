import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface Props {
  onBack: () => void
}

export default function BackButton({ onBack }: Props) {

  return (
    <Pressable onPress={onBack} style={styles.button}>
      <Ionicons
        name='chevron-back-outline'
        size={24}
        color={Colors.menuAccent}
      />
      <Text>Tilbage</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
