import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { MedicationProp, MedicationDetailsProps } from '../constants/types';
import { useEffect, useState } from 'react';
import { fetchDetails } from '../utils/get-meds';
import { Colors } from '../constants/colors';
import { capitalize } from '../utils/utils';
import IconItem from '../components/IconItem';

export default function MedicationDetails({
  route,
  navigation,
}: MedicationDetailsProps) {
  const [medication, setMedication] = useState<MedicationProp>();

  const vnr = route.params.vnr;

  useEffect(() => {
    async function fetch() {
      const item = await fetchDetails(vnr);
      setMedication(item);
      navigation.setOptions({ title: item.Navn });
    }

    fetch();
  }, [vnr]);

  if (!medication) {
    return (
      <View style={styles.fallback}>
        <ActivityIndicator />
      </View>
    );
  }

  const discDate =
    medication.UdgaaetDato &&
    new Date(+medication.UdgaaetDato.replace(/\D/g, '')).toLocaleDateString();

  console.log(medication);

  return (
    <ScrollView style={styles.container}>
      {/* <Text>{medication.Substitutioner}array</Text> */}
      <View style={styles.section}>
        <Text style={styles.h2}>Indikation</Text>
        <Text>{capitalize(medication.Indikation)}</Text>
        <Text style={styles.h2}>Dosering</Text>
        <Text>{capitalize(medication.Dosering)}</Text>
        <Text style={styles.h2}>Opbevaringstemperatur</Text>
        <Text>{medication.Opbevaringsbetingelser}</Text>
      </View>
      <View style={[styles.section, styles.row]}>
        <View>
          <Text style={styles.h2}>Styrke</Text>
          <Text style={styles.h2}>Virksomt stof</Text>
          <Text style={styles.h2}>Pakning</Text>
          <Text style={styles.h2}>Firma</Text>
        </View>
        <View>
          <Text style={styles.alignEnd}>{medication.Styrke}</Text>
          <Text style={styles.alignEnd}>{medication.VirksomtStof}</Text>
          <Text style={styles.alignEnd}>{medication.Pakning}</Text>
          <Text style={styles.alignEnd}>{medication.Firma}</Text>
        </View>
      </View>
      <View style={[styles.section, styles.row]}>
        <View>
          <Text style={styles.h2}>Pris per pakke</Text>
          <Text style={styles.h2}>Pris per enhed</Text>
          <Text style={styles.h2}>Døgnspris (DDD)</Text>
          <Text style={styles.h2}>Indkøbspris</Text>
          <Text style={styles.h2}>Tilskud beregnes af</Text>
        </View>
        <View>
          <Text style={styles.alignEnd}>{medication.PrisPrPakning} kr.</Text>
          <Text style={styles.alignEnd}>{medication.PrisPrEnhed} kr.</Text>
          <Text style={styles.alignEnd}>
            {parseFloat(medication.DDD).toFixed(2)} kr.
          </Text>
          <Text style={styles.alignEnd}>{medication.AIP} kr.</Text>
          <Text style={styles.alignEnd}>
            {medication.TilskudBeregnesAf} kr.
          </Text>
        </View>
      </View>
      <View style={[styles.section, styles.row]}>
        <View>
          <Text>NBS speciale</Text>
          <Text>ATC kode</Text>
          <Text>Tilskudskode</Text>
          <Text>Udleveringsgruppe</Text>
          <Text>Varenummer</Text>
        </View>
        <View>
          <Text style={styles.alignEnd}>{medication.NbsSpeciale ? medication.NbsSpeciale : 'Ingen'}</Text>
          <Text style={styles.alignEnd}>{medication.AtcKode}</Text>
          <Text style={styles.alignEnd}>
            {medication.TilskudKode} - {medication.TilskudTekst}
          </Text>
          <Text style={styles.alignEnd}>{medication.Udleveringsgruppe}</Text>
          <Text style={styles.alignEnd}>{medication.Varenummer}</Text>
        </View>
      </View>
      <View style={styles.noticeContainer}>
        {medication.TrafikAdvarsel && (
          <IconItem
            icon='warning'
            color={Colors.warning500}
            description='Trafikfarlig'
          />
        )}
        {medication.Haandkoeb && (
          <IconItem
            icon='checkmark'
            color={Colors.green}
            description='Håndkøb'
          />
        )}
        {medication.Udgaaet && (
          <IconItem
            icon='close-circle-outline'
            color={Colors.warning500}
            description={`Udgået per ${discDate}`}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  noticeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  priceContainer: {
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBox: {
    width: '30%',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  section: {
    backgroundColor: Colors.white,
    margin: 4,
    padding: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  text: {},
});
