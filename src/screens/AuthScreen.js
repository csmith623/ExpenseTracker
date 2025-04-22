import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useTheme } from '../context/ThemeContext';

export default function AuthScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (isSignUp) => {
    try {
      const action = isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      await action(auth, email, password);
    } catch (err) {
      setError(err.message);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Welcome Title */}
      <Text style={[styles.title, {color: theme.colors.text}]}>Welcome!</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, {color: theme.colors.text, borderColor: theme.colors.border}]}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#666"
        accessibilityLabel="Email"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, {color: theme.colors.text, borderColor: theme.colors.border}]}
        placeholderTextColor="#666"
        accessibilityLabel="Password"
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => handleAuth(true)} accessibilityLabel="Sign up" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => handleAuth(false)} accessibilityLabel="Login" />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    width: '100%', maxWidth: 300, height: 50, borderWidth: 1, borderRadius: 5,
    paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%', maxWidth: 300, marginBottom: 10,
  },
  errorText: {
    color: 'red', marginTop: 10, textAlign: 'center',
  }
});