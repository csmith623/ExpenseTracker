import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addExpense } from '../services/ExpenseService';
import { auth } from '../firebase';

export default function AddExpense({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const categories = ['Food', 'Transport', 'Housing', 'Entertainment'];

  const handleSubmit = async () => {
    try {
      if (!name || !amount || !description) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      await addExpense({
        name,
        amount: parseFloat(amount),
        description,
        category, // this is the current picker value
        userId: auth.currentUser.uid
      });
      onAdd();
      setName('');
      setAmount('');
      setDescription('');
      setCategory('Food'); // Reset picker to default
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          placeholder="Expense Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          placeholderTextColor="#666"
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {categories.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA'
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    fontSize: 16,
    height: 44,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});