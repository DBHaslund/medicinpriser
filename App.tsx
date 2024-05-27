import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import Favourites from './screens/Favourites';
import Settings from './screens/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Results from './screens/Results';

const Stack = createNativeStackNavigator<StackParamsList>();
const Tab = createBottomTabNavigator<TabParamsList>();

function Landing() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Landing'
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Results' component={Results} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
