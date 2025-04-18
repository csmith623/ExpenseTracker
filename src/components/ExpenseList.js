import React from 'react';
import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
    />
  );
}