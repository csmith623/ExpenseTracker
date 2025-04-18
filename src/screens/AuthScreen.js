import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen() {
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
        <Button title="Sign Up" onPress={() => handleAuth(true)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => handleAuth(false)} />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 10
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  }
});