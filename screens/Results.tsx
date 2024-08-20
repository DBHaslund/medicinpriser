import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';

import { MedicationProp, ResultsProps } from '../constants/types';
import { Colors } from '../constants/colors';
import { FetchMeds } from '../utils/get-meds';

import Medication from '../components/Medications/Medication';
import AdBanner from '../components/Ads/AdBanner';
import BackButton from '../components/UI/BackButton';

export default function Results({ navigation, route }: ResultsProps) {
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

  function backHandler() {
    navigation.navigate('Home');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onBack={backHandler} />,
    });
  }, []);

  let loader = <ActivityIndicator size={32} color={Colors.primary500} />;

  return (
    <View style={styles.screen}>
      {loading && loader}
      {!loading && items.length <= 0 && (
        <View style={styles.errorBox}>
          <Text style={styles.errorHead}>Ingen resultater fundet.</Text>
          <Text style={styles.errorText}>
            Tjek din indtastning og prøv igen.{' '}
          </Text>
        </View>
      )}
      <FlatList
        accessibilityLabel='Resultatliste'
        data={items}
        renderItem={(itemData) => (
          <Medication {...itemData.item} query={query} />
        )}
        keyExtractor={(item) => item.Varenummer}
      />
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgContent,
    marginHorizontal: 12,
    paddingVertical: 12,
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorHead: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
  },
});
