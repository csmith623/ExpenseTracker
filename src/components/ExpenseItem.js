import React from 'react';
import { View, Text, Button } from 'react-native';
import { deleteExpense } from '../services/Expenseservice';

export default function ExpenseItem({ expense }) {
  return (
    <View>
      <Text>{expense.name}</Text>
      <Text>${expense.amount} - {expense.category}</Text>
      <Button title="Delete" onPress={() => deleteExpense(expense.id)} />
    </View>
  );
}