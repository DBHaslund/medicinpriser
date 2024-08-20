import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FavMedsContext } from '../store/context/favMeds-context';
import { fetchFavs } from '../utils/database';
import { fetchDetails } from '../utils/get-meds';

import Medication from '../components/Medications/Medication';
import LoadingPage from '../components/UI/LoadingPage';
import AdBanner from '../components/Ads/AdBanner';
import { Colors } from '../constants/colors';

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

  let totalDDD = 0;
  for (const med of favCtx.favMeds) {
    totalDDD += Number(med.DDD);
  }

  let totalPrice = 0;
  for (const med of favCtx.favMeds) {
    totalPrice += Number(med.PrisPrPakning);
  }

  return (
    <View style={styles.screen}>
      {favCtx.favMeds.length > 0 && (
        <View style={styles.tally}>
          <View style={styles.tallyBox}>
            <Text>Samlet døgnspris:</Text>
            <Text style={styles.bold}>{totalDDD.toFixed(2)} kr.</Text>
          </View>
          <View style={styles.tallyBox}>
            <Text>Samlet pakkepris:</Text>
            <Text style={styles.bold}>{totalPrice.toFixed(2)} kr.</Text>
          </View>
        </View>
      )}
      {favCtx.favMeds.length < 1 && (
        <Text style={styles.emptyText}>Ingen favoritter tilføjet endnu.</Text>
      )}
      <FlatList
        accessibilityLabel='Favoritliste'
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
  tally: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  tallyBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginTop: 8,
    padding: 4,
    backgroundColor: Colors.white,
    borderRadius: 6,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 108,
    textAlign: 'center',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
