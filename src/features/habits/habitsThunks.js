import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, updateDoc, doc } from 'firebase/firestore';

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
    const user = auth.currentUser;
    if (user) {
        const q = query(collection(db, 'habits'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return [];
});

export const addHabit = createAsyncThunk('habits/addHabit', async (habit) => {
    const user = auth.currentUser;
    if (user) {
        const docRef = await addDoc(collection(db, 'habits'), {
            uid: user.uid,
            ...habit
        });
        return { id: docRef.id, uid: user.uid, ...habit };
    }
    return null;
});

export const removeHabit = createAsyncThunk('habits/removeHabit', async (id) => {
    await deleteDoc(doc(db, 'habits', id));
    return id;
});

export const completeHabit = createAsyncThunk('habits/completeHabit', async (id) => {
    await updateDoc(doc(db, 'habits', id), { completed: true });
    return id;
});