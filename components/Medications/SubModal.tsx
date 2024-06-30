import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';

import { MedicationProp, SubModalProps } from '../../constants/types';
import { Colors } from '../../constants/colors';
import { fetchDetails } from '../../utils/get-meds';

import Button from '../UI/Button';
import Medication from './Medication';
import { useEffect, useState } from 'react';

export default function SubModal({ onClose, visible, subs }: SubModalProps) {
  const [vnrList, setVnrList] = useState<string[]>([]);
  const [subList, setSubList] = useState<MedicationProp[]>([]);

  useEffect(() => {
    subs.map((sub) => setVnrList((prev) => [...prev, sub.Varenummer]));
  }, [subs]);

  useEffect(() => {
    async function updateList() {
      const updatedList = await fetchDetails(vnrList);
      const sortedList = updatedList.sort((a: any, b: any) => a.DDD - b.DDD);
      setSubList(sortedList);
    }

    updateList();
  }, [vnrList]);

  return (
    <View style={styles.screen}>
      <Modal animationType='slide' visible={visible}>
        <View style={styles.container}>
          <Text style={styles.title}>Substitutioner</Text>
          <FlatList
            data={subList}
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bgContent,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: Colors.bgContent,
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
