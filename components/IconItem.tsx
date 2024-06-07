import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IconItemProps } from '../constants/types';

export default function IconItem({ icon, color, description }: IconItemProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={24} color={color} />
      <Text>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
