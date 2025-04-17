import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (isSignUp) => {
    try {
      const action = isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      await action(auth, email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Sign Up" onPress={() => handleAuth(true)} />
      <Button title="Login" onPress={() => handleAuth(false)} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}