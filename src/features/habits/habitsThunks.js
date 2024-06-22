import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, updateDoc, getDoc, doc } from 'firebase/firestore';

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
        const status = {};
        habit.days.forEach(day => {
            status[day] = 'uncompleted';
        });

        const docRef = await addDoc(collection(db, 'habits'), {
            uid: user.uid,
            status,
            ...habit
        });
        return { id: docRef.id, ...habit, status };
    }
    return null;
});

export const removeHabit = createAsyncThunk('habits/removeHabit', async ({id, day}) => {
    const habitRef = doc(db, 'habits', id);
    const habitDoc = await getDoc(habitRef);

    if (habitDoc.exists()) {
        const habitData = habitDoc.data();
        const updatedDays = habitData.days.filter(d => d !== day);

        if (updatedDays.length > 0) {
            await updateDoc(habitRef, { days: updatedDays });
        } else {
            await deleteDoc(habitRef); // If no days left, delete the document
        }
    }

    return id;
});

export const completeHabit = createAsyncThunk('habits/completeHabit', async ({id, day}) => {
    const habitRef = doc(db, 'habits', id);
    const habitDoc = await getDoc(habitRef);

    if (habitDoc.exists()) {
        const habitData = habitDoc.data();
        const updatedStatus = { ...habitData.status, [day]: 'completed' };

        await updateDoc(habitRef, { status: updatedStatus });
    }

    return { id, day };
});