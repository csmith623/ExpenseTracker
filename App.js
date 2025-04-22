import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './src/firebase';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator user={user} />
      </NavigationContainer>
    </ThemeProvider>
  );
}

