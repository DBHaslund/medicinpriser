import { ActivityIndicator, Text, View } from 'react-native';
import { MedicationProp, MedicationDetailsProps } from '../constants/types';
import { useEffect, useState } from 'react';
import { fetchDetails } from '../utils/get-meds';

export default function MedicationDetails({ route }: MedicationDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [medication, setMedication] = useState<MedicationProp>();

  const vnr = route.params.vnr;

  useEffect(() => {
    async function fetch() {
      const item = await fetchDetails(vnr);
      setMedication(item);
      setLoading(false);
    }

    fetch();
  }, [vnr]);

  let content = loading ? (
    <ActivityIndicator />
  ) : (
    <>
      {medication && <Text>{medication.Detaljer}</Text>}
    </>
  );

  return <View>{content}</View>;
}
