import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';

import { ModalProps } from '../../constants/types';
import { Colors } from '../../constants/colors';

import Button from '../UI/Button';
import Medication from './Medication';

export default function SubModal({ onClose, visible, subs }: ModalProps) {
  return (
    <Modal animationType='slide' visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>Substitutioner</Text>

        <FlatList
          data={subs}
          renderItem={(itemData) => (
            <Medication {...itemData.item} onClose={onClose} />
          )}
          keyExtractor={(sub) => sub.Varenummer}
          contentContainerStyle={{ width: '100%' }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onClose}>Luk</Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '70%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    borderBottomColor: Colors.gray200,
    marginBottom: 16,
  },
});
