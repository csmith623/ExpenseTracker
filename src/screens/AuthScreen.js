import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created and signed in!');
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
      Alert.alert('Sign Up Error', err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in!');
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
      Alert.alert('Login Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff',
  },
  input: {
    width: '100%', maxWidth: 300, height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 5,
    paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%', maxWidth: 300, marginBottom: 10,
  },
  errorText: {
    color: 'red', marginTop: 10, textAlign: 'center',
  },
});