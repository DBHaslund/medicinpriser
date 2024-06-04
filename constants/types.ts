import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


export type MedicationProp = {
  Detaljer: string;
  Firma: string;
  Navn: string;
  Pakning: string;
  Styrke: string;
  Varenummer: string;
  VirksomtStof: string;
  AtcKode: string;
  Dosisdispensering: string;
  Udleveringsgruppe: string;
  PrisPrPakning: string;
  PrisPrEnhed: string;
  AIP: string;
  TilskudBeregnesAf: string;
  Udgaaet: string;
  UdgaaetDato: string;
  Substitutioner: string;
  BilligereKombinationer: string;
  Dosering: string;
  Indikation: string;
  TrafikAdvarsel: string;
  DDD: string;
  Opbevaringsbetingelser: string;
  NbsSpeciale: string;
  Haandkoeb: string;
  TilskudKode: string;
  TilskudTekst: string;
};




export type StackParamsList = {
  Landing: undefined;
  Results: { query: string };
  MedicationDetails: { vnr: string };
};

export type ResultsProps = NativeStackScreenProps<StackParamsList, 'Results'>;
export type MedicationDetailsProps = NativeStackScreenProps<StackParamsList, 'MedicationDetails'>;


export type TabParamsList = {
  Home: undefined;
  Settings: undefined;
  Favourites: undefined;
  Results: { query: string };
};

export type HomeProps = BottomTabScreenProps<TabParamsList, 'Home'>;

export type ButtonProps = {
  children: string;
  onPress: () => {};
};

export type IconItemProps = {
  icon: any;
  color: string;
  description: string,
}
