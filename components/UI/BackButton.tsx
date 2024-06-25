import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  route: string;
}

export default function BackButton({ route }: Props) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(route)}
      style={styles.button}
    >
      <Ionicons name='chevron-back-outline' size={24} color='black' />
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
