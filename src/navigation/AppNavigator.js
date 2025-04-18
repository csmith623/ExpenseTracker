import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen'; 
import HomeScreen from '../screens/HomeScreen'; 

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user }) {
  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}