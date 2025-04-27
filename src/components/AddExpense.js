import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { addExpense } from '../services/ExpenseService';
import { auth } from '../firebase';
import { useTheme } from '../context/ThemeContext';

export default function AddExpense({ onAdd }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('Food');
  const [categories, setCategories] = useState([
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Housing', value: 'Housing' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Utilities', value: 'Utilities' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Other', value: 'Other' },
  ]);

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
        category,
        userId: auth.currentUser.uid
      });
      onAdd();
      setName('');
      setAmount('');
      setDescription('');
      setCategory('Food');
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Choose a light placeholder color for dark mode
  const placeholderColor = theme.mode === 'dark' ? '#bbb' : '#666';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Expense Name</Text>
        <TextInput
          placeholder="Expense Name"
          value={name}
          onChangeText={setName}
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
          placeholderTextColor={placeholderColor}
          accessibilityLabel="Expense Name"
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Amount</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
          placeholderTextColor={placeholderColor}
          accessibilityLabel="Amount"
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
          placeholderTextColor={placeholderColor}
          accessibilityLabel="Description"
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Category</Text>
        <View style={{ zIndex: open ? 1000 : 1, width: '100%' }}>
          <DropDownPicker
            open={open}
            value={category}
            items={categories}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setCategories}
            placeholder="Select a category"
            style={{
              marginBottom: 15,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
            }}
            dropDownContainerStyle={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              zIndex: 2000,
            }}
            textStyle={{
              color: theme.colors.text,
              fontSize: 16,
            }}
            placeholderStyle={{
              color: placeholderColor,
            }}
            accessibilityLabel="Category"
          />
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.accent }]}
          onPress={handleSubmit}
          accessibilityLabel="Add this expense to your list"
        >
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
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 2,
    fontWeight: '600',
    fontSize: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    marginTop: 10,
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