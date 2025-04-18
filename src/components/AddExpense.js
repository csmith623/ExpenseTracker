import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addExpense } from '../services/ExpenseService';

export default function AddExpense({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const categories = ['Food', 'Transport', 'Housing', 'Entertainment'];

  const handleSubmit = async () => {
    try {
      if (name && amount) {
        await addExpense({
          name,
          amount: parseFloat(amount),
          category,
          userId: auth.currentUser.uid // Ensure user ID is included
        });
        onAdd();
        setName('');
        setAmount('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save expense: ' + error.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
        >
          {categories.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <Button 
        title="Add Expense" 
        onPress={handleSubmit} 
        color="#4CAF50"
      />
    </View>
  );
  
  const styles = StyleSheet.create({
    formContainer: {
      marginVertical: 20,
      width: '100%'
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: 'white'
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 15
    },
    picker: {
      height: 50,
      width: '100%'
    }
  });