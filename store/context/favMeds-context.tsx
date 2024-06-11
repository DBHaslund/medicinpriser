import { PropsWithChildren, createContext, useReducer } from 'react';
import { Action, FavContextProps, MedicationProp } from '../../constants/types';

export const FavMedsContext = createContext<FavContextProps>({
  favMeds: [],
  addFavMed: (medication) => {},
  deleteFavMed: (Varenummer) => {},
  setFavMeds: (medications) => {},
  updateFavMeds: (Varenummer, medication) => {},
});

function favMedsReducer(state: MedicationProp[], action: Action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;

    case 'UPDATE':
      const updatableMedicationIndex = state.findIndex(
        (medication: MedicationProp) =>
          medication.Varenummer === action.payload.Varenummer
      );
      const updatableMedication = state[updatableMedicationIndex];
      const updatedItem = { ...updatableMedication, ...action.payload.data };
      const updatedMedications = [...state];
      updatedMedications[updatableMedicationIndex] = updatedItem;
      return updatedMedications;

    case 'DELETE':
      return state.filter(
        (medication: MedicationProp) => medication.Varenummer !== action.payload
      );

    default:
      return state;
  }
}

export default function FavMedsContextProvider({
  children,
}: PropsWithChildren) {
  const [medicationState, dispatch] = useReducer(favMedsReducer, []);

  function addFavMed(medicationData: MedicationProp) {
    dispatch({ type: 'ADD', payload: medicationData });
  }

  function setFavMeds(medications: MedicationProp[]) {
    dispatch({ type: 'SET', payload: medications });
  }

  function updateFavMeds(Varenummer: string, medication: MedicationProp) {
    dispatch({
      type: 'UPDATE',
      payload: { Varenummer: Varenummer, data: medication },
    });
  }

  function deleteFavMed(Varenummer: string) {
    dispatch({ type: 'DELETE', payload: Varenummer });
  }

  const value: FavContextProps = {
    favMeds: medicationState as MedicationProp[],
    addFavMed: addFavMed as () => {},
    setFavMeds: setFavMeds as () => {},
    updateFavMeds: updateFavMeds as () => {},
    deleteFavMed: deleteFavMed as () => {},
  };

  return (
    <FavMedsContext.Provider value={value}>
      {children}
    </FavMedsContext.Provider>
  );
}
