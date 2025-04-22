import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, SafeAreaView } from 'react-native';
import { subscribeToExpenses } from '../services/ExpenseService';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToExpenses(setExpenses);
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Open settings"
        >
          <Text style={{fontSize: 24, color: theme.accent}}>⚙️</Text>
        </TouchableOpacity>
      </View>
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
              accessibilityLabel="Close add expense form"
            >
              <Text style={[styles.closeButtonText, {color: theme.accent}]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.fab, {backgroundColor: theme.accent}]}
        onPress={() => setShowForm(true)}
        activeOpacity={0.7}
        accessibilityLabel="Add a new expense"
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 40,
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
    width: '90%',
    alignItems: 'center',
    elevation: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});