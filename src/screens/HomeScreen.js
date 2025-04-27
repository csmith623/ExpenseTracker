import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, SafeAreaView, ScrollView } from 'react-native';
import { subscribeToExpenses } from '../services/ExpenseService';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Real-time subscription to Firebase expenses
  useEffect(() => {
    const unsubscribe = subscribeToExpenses(setExpenses);
    return unsubscribe;
  }, []);

  // Calculate totals
  const totalSpent = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + (Number(exp.amount) || 0);
    return acc;
  }, {});

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.headerRow}>
        <Text style={[styles.heading, {color: theme.colors.text}]}>Home</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Open settings"
        >
          <Text style={{fontSize: 24, color: theme.accent}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Section */}
      <View style={[styles.summaryContainer, {backgroundColor: theme.colors.card, borderColor: theme.colors.border}]}>
        <Text style={[styles.summaryTitle, {color: theme.colors.text}]}>Summary</Text>
        <Text style={[styles.summaryTotal, {color: theme.accent}]}>
          Total: ${totalSpent.toFixed(2)}
        </Text>
        <ScrollView style={styles.summaryList}>
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <View key={category} style={styles.summaryRow}>
              <Text style={[styles.categoryText, {color: theme.colors.text}]}>{category}</Text>
              <Text style={[styles.amountText, {color: theme.colors.text}]}>
                ${amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Expense List */}
      <ExpenseList expenses={expenses} />

      {/* Add Expense Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
        transparent
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: theme.colors.card}]}>
            <AddExpense onAdd={() => setShowForm(false)} />
            <TouchableOpacity
              onPress={() => setShowForm(false)}
              style={styles.closeButton}
            >
              <Text style={[styles.closeButtonText, {color: theme.accent}]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, {backgroundColor: theme.accent}]}
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
    paddingTop: 20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  summaryContainer: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 3
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15
  },
  summaryList: {
    maxHeight: 150
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  categoryText: {
    fontSize: 16
  },
  amountText: {
    fontSize: 16,
    fontWeight: '500'
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  fabText: {
    color: 'white',
    fontSize: 28,
    marginBottom: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    borderRadius: 15,
    padding: 20,
    width: '90%'
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 15
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});