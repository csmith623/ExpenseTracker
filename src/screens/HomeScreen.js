import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Expense Tracker</Text>
      <ExpenseList expenses={expenses} />

      <Modal
        visible={showForm}
        animationType="slide"
        transparent
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddExpense onAdd={() => setShowForm(false)} />
            <TouchableOpacity 
              onPress={() => setShowForm(false)} 
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowForm(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 10
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 40,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    width: '90%'
  },
  closeButton: {
    marginTop: 10,
    padding: 10
  },
  closeButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16
  }
});