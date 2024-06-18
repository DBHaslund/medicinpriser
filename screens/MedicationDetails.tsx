import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { MedicationProp, MedicationDetailsProps } from '../constants/types';
import { Colors } from '../constants/colors';
import { fetchDetails } from '../utils/get-meds';
import { capitalize } from '../utils/utils';
import { FavMedsContext } from '../store/context/favMeds-context';

import IconItem from '../components/UI/IconItem';
import Button from '../components/UI/Button';
import SubModal from '../components/Medications/SubModal';
import IconButton from '../components/UI/IconButton';
import LoadingPage from '../components/UI/LoadingPage';

export default function MedicationDetails({
  route,
  navigation,
}: MedicationDetailsProps) {
  const [medication, setMedication] = useState<MedicationProp>();
  const [modalVis, setModalVis] = useState(false);
  const [fav, setFav] = useState(false);

  const favCtx = useContext(FavMedsContext);

  const vnr = route.params.vnr;

  function favHandler() {
    if (fav && medication) {
      setFav(false);
      favCtx.deleteFavMed(medication.Varenummer);
    } else if (!fav && medication) {
      setFav(true);
      favCtx.addFavMed(medication);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={fav ? 'heart' : 'heart-outline'}
          color='red'
          size={24}
          onPress={favHandler}
        />
      ),
    });
  }, [favHandler, fav]);

  useEffect(() => {
    async function fetch() {
      const item = await fetchDetails(vnr);
      setMedication(item);
      navigation.setOptions({ title: item.Navn });
    }

    if (favCtx.favMeds.find((item) => item.Varenummer === vnr)) {
      setFav(true);
    }

    fetch();
  }, [vnr]);

  if (!medication) {
    return (
      <LoadingPage />
    );
  }

  function subOpenHandler() {
    setModalVis(true);
  }

  function subCloseHandler() {
    setModalVis(false);
  }

  const discDate =
    medication.UdgaaetDato &&
    new Date(+medication.UdgaaetDato.replace(/\D/g, '')).toLocaleDateString();

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.alignEnd}>
            {medication.NbsSpeciale ? medication.NbsSpeciale : 'Ingen'}
          </Text>
          <Text style={styles.alignEnd}>{medication.AtcKode}</Text>
          <Text style={styles.alignEnd}>
            {medication.TilskudKode} - {medication.TilskudTekst}
          </Text>
          <Text style={styles.alignEnd}>{medication.Udleveringsgruppe}</Text>
          <Text style={styles.alignEnd}>{medication.Varenummer}</Text>
        </View>
      </View>
      {medication.Substitutioner.length > 0 && (
        <View style={styles.subBox}>
          <Button onPress={subOpenHandler}>Vis substitutioner</Button>
          <SubModal
            onClose={subCloseHandler}
            visible={modalVis}
            subs={medication.Substitutioner}
          />
        </View>
      )}

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
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: 4,
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  subBox: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 16,
  },
  h2: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
});
