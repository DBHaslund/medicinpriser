type MedicationDetails = {
    Detaljer: string;
    Firma: string;
    Navn: string;
    Pakning: string;
    Styrke: string;
    Varenummer: string;
};  

type StackParamsList = {
    Landing: undefined
    Results: { query: string},
}

type TabParamsList = {
    Home: undefined;
    Settings: undefined,
    Favourites: undefined,
    Results: { query: string},
  };
  
