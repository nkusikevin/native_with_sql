import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Detail from './screens/DetailNote';
import AddNote from './screens/AddNote';
import { initializeDatabase } from './db/db';

export default function App() {
  const [loaded] = useFonts({
    "Poppins": require("./assets/fonts/regular.ttf"),
    "Semibold": require("./assets/fonts/semibold.ttf")
  });

  if (!loaded) {
    return null;
  }
  initializeDatabase()
    .then(() => {
      console.log('Initialized database');
    })
    .catch(err => {
      console.log('Initializing db failed.');
      console.log(err);
    });
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetailNote" component={Detail} />
        <Stack.Screen name="AddNote" component={AddNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
