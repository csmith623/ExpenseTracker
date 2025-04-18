import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { subscribeToExpenses } from '../services/Expenseservice';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToExpenses(setExpenses);
    return unsubscribe;
  }, []);

  return (
    <View>
      <Button title={showForm ? "Hide Form" : "Add Expense"} onPress={() => setShowForm(!showForm)} />
      {showForm && <AddExpense onAdd={() => setShowForm(false)} />}
      <ExpenseList expenses={expenses} />
    </View>
  );
}