import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export const addExpense = async (expense) => {
  await addDoc(collection(db, 'expenses'), {
    ...expense,
    userId: auth.currentUser.uid,
    date: new Date().toISOString()
  });
};

export const subscribeToExpenses = (callback) => {
  const q = query(collection(db, 'expenses'), where('userId', '==', auth.currentUser.uid));
  return onSnapshot(q, (snapshot) => {
    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(expenses);
  });
};

export const deleteExpense = async (id) => {
  await deleteDoc(doc(db, 'expenses', id));
};