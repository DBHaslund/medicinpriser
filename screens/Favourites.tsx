import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FavMedsContext } from '../store/context/favMeds-context';
import { fetchFavs } from '../utils/database';
import { fetchDetails } from '../utils/get-meds';

import Medication from '../components/Medications/Medication';
import LoadingPage from '../components/UI/LoadingPage';
import AdBanner from '../components/Ads/AdBanner';

export default function Favourites() {
  const [loading, setLoading] = useState<boolean>();
  const favCtx = useContext(FavMedsContext);

  useEffect(() => {
    setLoading(true);
    async function fetchFromDb() {
      const favs = await fetchFavs();
      const favVnrs = favs.map((fav: any) => fav.Varenummer);
      const updatedList = await fetchDetails(favVnrs);
      favCtx.setFavMeds(updatedList);
    }
    fetchFromDb();
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <View style={styles.screen}>
      {favCtx.favMeds.length < 1 && (
        <Text style={styles.emptyText}>Ingen favoritter tilføjet endnu.</Text>
      )}
      <FlatList
        data={favCtx.favMeds}
        renderItem={(itemData) => <Medication {...itemData.item} />}
        keyExtractor={(item) => item.Varenummer}
      />
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 12,
    paddingVertical: 12,
  },
  emptyText: {
    marginTop: 32,
  },
});
