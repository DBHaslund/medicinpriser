import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  
  return (
    <Pressable
      onPress={() => navigation.goBack()}
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
