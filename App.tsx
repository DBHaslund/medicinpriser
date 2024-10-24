import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';

import { Ionicons } from '@expo/vector-icons';

import { HomeTabProps, TabParamsList } from './constants/types';
import FavMedsContextProvider from './store/context/favMeds-context';
import { init } from './utils/database';

import Home from './screens/Home';
import Favourites from './screens/Favourites';
import Settings from './screens/Settings';
import Results from './screens/Results';
import MedicationDetails from './screens/MedicationDetails';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/colors';

const Tab = createBottomTabNavigator<TabParamsList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInit, setDbInit] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
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
      <StatusBar style='light' backgroundColor={Colors.menu} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            tabBarHideOnKeyboard: true,
            headerStyle: { backgroundColor: Colors.menu, height: 100 },
            headerTitleStyle: { color: Colors.menuAccent },
            tabBarStyle: { backgroundColor: Colors.menu },
            tabBarActiveTintColor: Colors.menuActive,
            tabBarInactiveTintColor: Colors.menuAccent,
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

          <Tab.Screen
            name='Results'
            component={Results}
            options={{
              title: 'Resultat',
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen
            name='MedicationDetails'
            component={MedicationDetails}
            options={{
              title: 'Detaljer',
              tabBarButton: () => null,
              unmountOnBlur: true,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavMedsContextProvider>
  );
}
