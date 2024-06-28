import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const today = format(new Date(), 'EEEE');
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    useEffect(() => {
        const fetchHabits = async () => {
            const habitsCol = collection(db, 'habits');
            const q = query(habitsCol, where('uid', '==', user.uid));
            const snapshot = await getDocs(q);
            const habitsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHabits(habitsList);
        };
        fetchHabits();
    }, [user.uid]);

    const handleCompleteClick = async (habitId, day) => {
        try {
            const habitRef = doc(db, 'habits', habitId);
            const habitSnapshot = await getDoc(habitRef);
            if (habitSnapshot.exists()) {
                const habitData = habitSnapshot.data();
                const updatedStatus = { ...habitData.status, [day]: 'completed' };
                await updateDoc(habitRef, { status: updatedStatus });
                setHabits(habits.map(habit => {
                    if (habit.id === habitId) {
                        habit.status = updatedStatus;
                    }
                    return habit;
                }));
            }
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };


    const handleDeleteClick = async (habitId, day) => {
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
                setHabits(habits.map(habit => {
                    if (habit.id === habitId) {
                        habit.days = updatedDays;
                    }
                    return habit;
                }).filter(habit => habit.days.length > 0));
            }
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const weekHabits = daysOfWeek.map(day => ({
        day,
        habits: habits.filter(habit => habit.days.includes(day)),
    }));

    const addNewHabit = () => {
        navigate('/addhabit');
    };

    return (
        <div>



            <button onClick={addNewHabit}>Add new Habit</button>
            <h2>{`Week from ${format(startDate, 'MMMM d')} to ${format(endDate, 'MMMM d')}`}</h2>
            <h3>{`Hello, ${user.displayName || user.email}!`}</h3>

            <h2>Habits for Today</h2>
            <ul>
                {habits.filter(habit => habit.days.includes(today)).map(habit => (
                    <li
                        key={habit.id}
                        className={`habit-item ${habit.status?.[today] === 'completed' ? 'habit-completed' : 'habit-uncompleted'}`}
                    >
                        {habit.name} - {habit.status?.[today]}
                        <button onClick={() => handleCompleteClick(habit.id, today)}>Mark as completed</button>
                        <button onClick={() => handleDeleteClick(habit.id, today)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>All Habits for the Week</h2>
            <table className="habits-table">
                <thead>
                <tr>
                    {daysOfWeek.map(day => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {weekHabits.map(dayHabits => (
                        <td key={dayHabits.day}>
                            {dayHabits.habits.map(habit => (
                                <div
                                    key={habit.id}
                                    className={`habit-item ${habit.status?.[dayHabits.day] === 'completed' ? 'habit-completed' : 'habit-uncompleted'}`}
                                >
                                    {habit.name} - {habit.status?.[dayHabits.day]}
                                </div>
                            ))}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
);
};

export default Dashboard;