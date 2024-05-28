import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MedicationProp } from '../../constants/types';
import { Colors } from '../../constants/colors';

export default function Medication({ ...item }: MedicationProp) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  function detailHandler() {
    const vnr = item.Varenummer;
    navigation.navigate('MedicationDetails', { vnr });
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={detailHandler}
    >
      <View style={styles.idBox}>
        <Text>{item.Navn}</Text>
        <Text>{item.Styrke}</Text>
      </View>
      <View>
        <Text>{item.Firma}</Text>
        <Text>{item.Pakning}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  pressed: {
    opacity: 0.75,
  },
  idBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    marginBottom: 4,
  },
});
