import { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FavMedsContext } from '../store/context/favMeds-context';
import Medication from '../components/Medications/Medication';

export default function Favourites() {
  const favCtx = useContext(FavMedsContext);

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
    alignItems: 'center'
  },
});
