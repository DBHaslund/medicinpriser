import { Modal, StyleSheet, Text, View } from 'react-native';

import { InfoModalProps } from '../../constants/types';
import { Colors } from '../../constants/colors';
import Button from './Button';

export default function InfoModal({ onClose, visible, info }: InfoModalProps) {
  return (
    <Modal animationType='slide' visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{info.title}</Text>
        <Text>{info.text}</Text>
      </View>
        <View style={styles.button}>
          <Button onPress={onClose}>Tilbage</Button>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    borderBottomColor: Colors.gray200,
    marginVertical: 32,
  },
  button: { 
    alignSelf: 'center',
    marginBottom: 64,
  },
});
