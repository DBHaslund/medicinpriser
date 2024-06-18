import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FavMedsContext } from '../store/context/favMeds-context';
import Medication from '../components/Medications/Medication';
import { fetchFavs } from '../utils/database';
import { fetchDetails } from '../utils/get-meds';
import LoadingPage from '../components/UI/LoadingPage';

export default function Favourites() {
  const [loading, setLoading] = useState<boolean>();
  const favCtx = useContext(FavMedsContext);

  useEffect(() => {
    setLoading(true)
    async function fetchFromDb() {
      const favs = await fetchFavs();
      const favVnrs = favs.map((fav: any) => fav.Varenummer);
      const updatedList = await fetchDetails(favVnrs);
      favCtx.setFavMeds(updatedList);
    }
    fetchFromDb();
    setLoading(false)
  }, []);

  if (loading) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      {favCtx.favMeds.length < 1 && (
        <Text style={styles.emptyText}>No favourites added yet.</Text>
      )}
      <FlatList
        data={favCtx.favMeds}
        renderItem={(itemData) => <Medication {...itemData.item} />}
        keyExtractor={(item) => item.Varenummer}
        contentContainerStyle={{ width: '80%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 32,
  },
});
