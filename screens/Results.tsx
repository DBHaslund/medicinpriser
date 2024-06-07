import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { MedicationProp, ResultsProps } from '../constants/types';
import { Colors } from '../constants/colors';
import { FetchMeds } from '../utils/get-meds';

import Medication from '../components/Medications/Medication';

export default function Results({ route }: ResultsProps) {
  const [items, setItems] = useState<MedicationProp[]>([]);
  const [loading, setLoading] = useState(true);

  const query = route.params.query;

  useEffect(() => {
    async function fetch(query: string) {
      const meds = await FetchMeds(query);
      setItems(meds);
      setLoading(false);
    }
    fetch(query);
  }, [query]);

  let loader = <ActivityIndicator size={32} color={Colors.primary500} />;

  return (
    <View style={styles.container}>
      {loading && loader}
      <FlatList
        data={items}
        renderItem={(itemData) => <Medication {...itemData.item} />}
        keyExtractor={(item) => item.Varenummer}
        contentContainerStyle={{ width: '100%' }}
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
