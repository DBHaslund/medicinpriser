import { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FavMedsContext } from '../store/context/favMeds-context';
import Medication from '../components/Medications/Medication';
import { fetchFavs } from '../utils/database';
import { fetchDetails } from '../utils/get-meds';

export default function Favourites() {
  const favCtx = useContext(FavMedsContext);

  useEffect(() => {
    async function fetchFromDb() {
      const favs = await fetchFavs();
      const favVnrs = favs.map((fav: any) => fav.Varenummer);
      const updatedList = await fetchDetails(favVnrs);
      favCtx.setFavMeds(updatedList);
    }
    fetchFromDb();
  }, []);

  return (
    <View style={styles.container}>
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
});
