import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/UI/Button';
import AdBanner from '../components/Ads/AdBanner';
import InfoModal from '../components/UI/InfoModal';

import { Privatlivspolitik } from '../assets/privatlivspolitik';
import { Colors } from '../constants/colors';

export default function Settings() {
  const [privacyModalVis, setPrivacyModalVis] = useState(false);

  function openPrivacyModal() {
    setPrivacyModalVis(true);
  }
  function closePrivacyModal() {
    setPrivacyModalVis(false);
  }

  function removeAdsHandler() {
    Alert.alert('Kommer snart', 'Beklager, denne funktion er ikke implementeret endnu.', [
      { text: 'Okay', style: 'cancel' },
    ]);
  }

  return (
    <View style={styles.screen}>
      <InfoModal
        onClose={closePrivacyModal}
        visible={privacyModalVis}
        info={Privatlivspolitik}
      />
      <View style={styles.container}>
        <Pressable onPress={openPrivacyModal} style={styles.option}>
          <Text style={styles.optionText}>Privatlivspolitik</Text>
        </Pressable>
      </View>
      <View style={styles.adContainer}>
        <Text style={styles.adText}>
          Vil du støtte appen og slippe for reklamer?
        </Text>
        <View style={styles.button}>
          <Button onPress={removeAdsHandler}>
            Fjern reklamer for 10 kr. - Klik her!
          </Button>
        </View>
      </View>
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgContent,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    width: '80%',
    margin: 12,
    padding: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray200,
  },
  optionText: {
    textAlign: 'center',
    fontSize: 18,
  },
  adContainer: {
    marginBottom: 24,
  },
  adText: {
    textAlign: 'center',
    fontSize: 18,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
  },
});
