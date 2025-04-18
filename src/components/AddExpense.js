import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addExpense } from '../services/Expenseservice';

export default function AddExpense({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const categories = ['Food', 'Transport', 'Housing', 'Entertainment'];

  const handleSubmit = async () => {
    if (name && amount) {
      await addExpense({
        name,
        amount: parseFloat(amount),
        category
      });
      onAdd();
      setName('');
      setAmount('');
    }
  };

  return (
    <View>
      <TextInput placeholder="Expense Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Picker selectedValue={category} onValueChange={setCategory}>
        {categories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
}