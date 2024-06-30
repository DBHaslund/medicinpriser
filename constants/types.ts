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
  Substitutioner: [];
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
  query: string,
  onClose: () => void;
};

export type TabParamsList = {
  Home: undefined;
  Settings: undefined;
  Favourites: undefined;
  Results: { query: string };
  MedicationDetails: { vnr: string, query: string };
  };
  
export type HomeTabProps = BottomTabScreenProps<TabParamsList, 'Home'>;
export type ResultsProps = NativeStackScreenProps<TabParamsList, 'Results'>;
export type MedicationDetailsProps = NativeStackScreenProps<TabParamsList, 'MedicationDetails'>;

export type ButtonProps = {
  children: string;
  onPress: () => void;
  style?: string[]
};

export type IconItemProps = {
  icon: any;
  color: string;
  description: string,
}

export interface SubModalProps {
  onClose: () => void;
  visible: boolean;
  subs: MedicationProp[];
}

export interface InfoModalProps {
  onClose: () => void;
  visible: boolean;
  info: {title: string, text: string};
}

export interface FavContextProps {
    favMeds: MedicationProp[],
    addFavMed: (medication: MedicationProp) => void,
    setFavMeds: (medications: MedicationProp[]) => void,
    updateFavMeds: (Varenummer: string, medication: MedicationProp) => void,
    deleteFavMed: (Varenummer: string) => void,

}

export interface Action {
  type: 'ADD' | 'SET' | 'UPDATE' | 'DELETE',
  payload?: any,
}

export interface IconButtonProps {
  icon: any, 
  size: number, 
  color: string | undefined,
  onPress: () => void,
}