import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { deleteExpense } from '../services/ExpenseService';

// Helper to format numbers with commas
function formatAmount(amount) {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ExpenseItem({ expense }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{expense.name}</Text>
        <Text style={styles.details}>
            ${formatAmount(expense.amount)}
        </Text>
        {expense.description ? (
          <Text style={styles.description}>{expense.description}</Text>
        ) : null}
      </View>
      <Button
        title="Delete"
        onPress={() => deleteExpense(expense.id)}
        color="#F44336"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    elevation: 2,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    marginRight: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121'
  },
  details: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
    fontStyle: 'italic'
  }
});