import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { subscribeToExpenses } from '../services/ExpenseService'; 
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
import { StyleSheet } from 'react-native';

// Add to your HomeScreen component
return (
  <View style={styles.container}>
    <Button 
      title={showForm ? "Hide Form" : "Add Expense"} 
      onPress={() => setShowForm(!showForm)}
      color="#2196F3"
    />
    {showForm && <AddExpense onAdd={() => setShowForm(false)} />}
    <ExpenseList expenses={expenses} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  }
});