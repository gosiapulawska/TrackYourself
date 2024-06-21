import { createSlice } from '@reduxjs/toolkit';
import { fetchHabits, addHabit, removeHabit, completeHabit } from './habitsThunks';

const initialState = {
    habits: [],
    status: 'idle',
    error: null,
};

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.habits = action.payload;
            })
            .addCase(fetchHabits.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addHabit.fulfilled, (state, action) => {
                state.habits.push(action.payload);
            })
            .addCase(removeHabit.fulfilled, (state, action) => {
                state.habits = state.habits.filter(habit => habit.id !== action.payload);
            })
            .addCase(completeHabit.fulfilled, (state, action) => {
                const habit = state.habits.find(habit => habit.id === action.payload);
                if (habit) {
                    habit.completed = true;
                }
            });
    },
});

export const selectAllHabits = (state) => state.habits.habits;
export const selectHabitStatus = (state) => state.habits.status;
export const selectHabitError = (state) => state.habits.error;

export default habitSlice.reducer;
export { fetchHabits };