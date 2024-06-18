import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';

import { Ionicons } from '@expo/vector-icons';

import {
  HomeStackProps,
  StackParamsList,
  TabParamsList,
} from './constants/types';

import Home from './screens/Home';
import Favourites from './screens/Favourites';
import Settings from './screens/Settings';
import Results from './screens/Results';
import MedicationDetails from './screens/MedicationDetails';
import FavMedsContextProvider, {
  FavMedsContext,
} from './store/context/favMeds-context';
import { useContext, useEffect, useState } from 'react';
import { fetchFavs, init } from './utils/database';
import { fetchDetails } from './utils/get-meds';

const Stack = createNativeStackNavigator<StackParamsList>();
const Tab = createBottomTabNavigator<TabParamsList>();

SplashScreen.preventAutoHideAsync();

function Landing() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Hjem',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Favourites'
        component={Favourites}
        options={{
          title: 'Favoritter',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          title: 'Indstillinger',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App({ navigation }: HomeStackProps) {
  const [dbInit, setDbInit] = useState(false);
  const favCtx = useContext(FavMedsContext);

  useEffect(() => {
    async function setup() {
      const favs = await fetchFavs();
      
      const favVnrs = favs.map((fav: any) => fav.Varenummer);
      const updatedList = await fetchDetails(favVnrs);
      console.log('Function loaded');
      favCtx.setFavMeds(updatedList);
    }
    setup();
    init()
      .then(async () => {
        setDbInit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (dbInit) {
    SplashScreen.hideAsync();
  }

  return (
    <FavMedsContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen
            name='Landing'
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Results'
            component={Results}
            options={{ title: 'Resultat' }}
          />
          <Stack.Screen
            name='MedicationDetails'
            component={MedicationDetails}
            options={{
              title: 'Detaljer',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavMedsContextProvider>
  );
}
