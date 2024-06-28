import { createSlice } from '@reduxjs/toolkit';
import { collection, addDoc, deleteDoc, getDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const habitsSlice = createSlice({
    name: 'habits',
    initialState: {
        habits: [],
        status: 'idle',
        error: null,
        loading: false
    },
    reducers: {
        addHabitStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addHabitSuccess: (state, action) => {
            const newHabit = action.payload;
            const habitExists = state.habits.some(habit => habit.id === newHabit.id);
            if (!habitExists) {
                state.habits.push(newHabit);
            }
        },
        addHabitFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setHabits: (state, action) => {
            state.habits = action.payload;
        },
        deleteHabitSuccess: (state, action) => {
            const { habitId, day } = action.payload;
            const habitIndex = state.habits.findIndex(habit => habit.id === habitId);
            if (habitIndex !== -1) {
                state.habits[habitIndex].days = state.habits[habitIndex].days.filter(d => d !== day);
                if (state.habits[habitIndex].days.length === 0) {
                    state.habits.splice(habitIndex, 1);
                }
            }
        },
        updateHabitSuccess: (state, action) => {
            const habit = state.habits.find(habit => habit.id === action.payload);
            if (habit) {
                habit.status = 'completed';
            }
        }
    }
});

export const { addHabitStart, addHabitSuccess, addHabitFailure, setHabits, deleteHabitSuccess, updateHabitSuccess } = habitsSlice.actions;

export const fetchHabits = (uid) => async dispatch => {
    const habitsCol = collection(db, 'habits');
    const q = query(habitsCol, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    const habitsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setHabits(habitsList));
};

export const addHabit = (habit) => async dispatch => {
    dispatch(addHabitStart());
    try {
        const docRef = await addDoc(collection(db, 'habits'), habit);
        dispatch(addHabitSuccess({ ...habit, id: docRef.id }));
    } catch (error) {
        dispatch(addHabitFailure(error.message));
    }
};

export const deleteHabit = (habitId, day) => async dispatch => {
    try {
        const habitRef = doc(db, 'habits', habitId);
        const habitSnapshot = await getDoc(habitRef);
        if (habitSnapshot.exists()) {
            const habitData = habitSnapshot.data();
            const updatedDays = habitData.days.filter(d => d !== day);
            if (updatedDays.length > 0) {
                await updateDoc(habitRef, { days: updatedDays });
            } else {
                await deleteDoc(habitRef);
            }
            dispatch(deleteHabitSuccess({ habitId, day }));
        }
    } catch (error) {
        console.error('Error deleting habit:', error);
    }
};

export const updateHabit = (habitId, day) => async dispatch => {
    try {
        const habitRef = doc(db, 'habits', habitId);
        const habitSnapshot = await getDoc(habitRef);
        if (habitSnapshot.exists()) {
            const habitData = habitSnapshot.data();
            const statusByDay = { ...habitData.status, [day]: 'completed' };
            await updateDoc(habitRef, { status: statusByDay });
            dispatch(updateHabitSuccess({ habitId, day }));
        }
    } catch (error) {
        console.error('Error updating habit:', error);
    }
};

export default habitsSlice.reducer;