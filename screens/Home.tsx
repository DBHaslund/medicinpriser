import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FetchDrugs from '../utils/get-drugs';

export default function Home() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<MedicationDetails[]>([]);

  const queryHandler = (enteredQuery: string) => {
    setQuery(enteredQuery);
  };

  const searchHandler = async () => {
    const drugs = await FetchDrugs(query);
    console.log(drugs);
    setItems(drugs);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Text style={{ fontSize: 32 }}>Velkommen!</Text>
        <Text>Indtast medicin for at søge pris</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} onChangeText={queryHandler} />
        <Button title='    Søg    ' onPress={searchHandler} />
      </View>
      <View style={styles.resultContainer}>
        <Text
          style={{ fontSize: 24, borderBottomWidth: 1, borderColor: '#ccc' }}
        >
          Resultat
        </Text>
        <FlatList
          data={items}
          renderItem={(itemData) => (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{itemData.item.Navn}</Text>
              <Text>{itemData.item.Firma}</Text>
            </View>
          )}
          keyExtractor={(item) => item.Varenummer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  inputText: {
    paddingHorizontal: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
  },
  resultContainer: {
    flex: 7,
    alignItems: 'center',
  },
});
