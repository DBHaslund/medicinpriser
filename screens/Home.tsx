import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<TabParamsList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const queryHandler = (enteredQuery: string) => {
    setQuery(enteredQuery);
  };

  const searchHandler = async () => {
    navigation.navigate('Results', { query });
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  inputContainer: {
    flex: 10,
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
});
