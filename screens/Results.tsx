import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { FetchMeds } from '../utils/get-meds';
import { useEffect, useState } from 'react';

import { Colors } from '../constants/colors';
import Drug from '../components/Medications/Medication';
import { MedicationProp, ResultsProps } from '../constants/types';

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
        renderItem={(itemData) => <Drug {...itemData.item} />}
        keyExtractor={(item) => item.Varenummer}
        contentContainerStyle={{width: '100%'}}
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
