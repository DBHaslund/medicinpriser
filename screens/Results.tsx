import { FlatList, StyleSheet, Text, View } from 'react-native';
import FetchDrugs from '../utils/get-drugs';
import { useEffect, useState } from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<StackParamsList, 'Results'>;

export default function Results({ route }: Props) {
  const [items, setItems] = useState<MedicationDetails[]>([]);

  const query = route.params.query;

  useEffect(() => {
    async function fetch(query: string) {
      const drugs = await FetchDrugs(query);
      setItems(drugs);
    }

    fetch(query)
  }, [query]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={(itemData) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>{itemData.item.Navn}</Text>
            <Text>{itemData.item.Firma}</Text>
          </View>
        )}
        keyExtractor={(item) => item.Varenummer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
