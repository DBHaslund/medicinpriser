import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { HomeTabProps } from '../constants/types';
import { Colors } from '../constants/colors';

import Button from '../components/UI/Button';
import AdBanner from '../components/Ads/AdBanner';

export default function Home({ navigation }: HomeTabProps) {
  const [query, setQuery] = useState('');

  const queryHandler = (enteredQuery: string) => {
    setQuery(enteredQuery);
  };

  const searchHandler = async () => {
    if (!query.trim()) {
      Alert.alert('Fejl', 'Indtast for at søge.', [
        { text: 'Okay', style: 'cancel' },
      ]);
      return;
    }

    navigation.navigate('Results', { query });
    setQuery('');
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 32 }}>Velkommen!</Text>
        </View>
        <View style={styles.content}>
          <Text>Indtast medicin eller virksomt stof for at søge</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              onChangeText={queryHandler}
              value={query}
            />
            <Button onPress={searchHandler}>Søg</Button>
          </View>
        </View>
      </ScrollView>
      <AdBanner />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgContent,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.gray200,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
    width: '100%',
  },
  inputText: {
    marginBottom: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.gray200,
    width: '70%',
    backgroundColor: Colors.white,
  },
});
