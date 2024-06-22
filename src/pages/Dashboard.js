import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllHabits } from "../features/habits/habitsSlice";
import { fetchHabits, completeHabit, removeHabit } from '../features/habits/habitsThunks';
import { format, startOfWeek, endOfWeek } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Dashboard = () => {
    const dispatch = useDispatch();
    const habits = useSelector(selectAllHabits);
    const user = auth.currentUser;
    const navigate = useNavigate();
    const today = format(new Date(), 'EEEE');

    useEffect(() => {
        dispatch(fetchHabits());
    }, [dispatch]);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    const weekHabits = daysOfWeek.map(day => {
        return {
            day,
            habits: habits.filter(habit => habit.days.includes(day))
        };
    });

    const addNewHabit = (e) => {
        e.preventDefault();
        navigate('/addhabit');
    }
    const handleCompleteClick = async (habitId, day) => {
        await dispatch(completeHabit({ id: habitId, day }));
        dispatch(fetchHabits());
    };

    const handleDeleteClick = async (habitId, day) => {
        await dispatch(removeHabit({ id: habitId, day }));
        dispatch(fetchHabits());
    };

    return (
        <div>
            <button onClick={addNewHabit}>Add new Habit</button>
            <h2>{`Week from ${format(startDate, 'MMMM d')} to ${format(endDate, 'MMMM d')}`}</h2>
            <h3>{`Hello, ${user.displayName || user.email}!`}</h3>

            <h2>Habits for Today</h2>
            <ul>
                {habits.filter(habit => habit.days.includes(format(new Date(), 'EEEE'))).map(habit => (
                    <li
                        key={habit.id}
                        className={`habit-item ${habit.status[today] === 'completed' ? 'habit-completed' : 'habit-uncompleted'}`}
                    >
                        {habit.name} - {habit.status[today]}
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
                                <div key={habit.id} className={`habit-item ${habit.status?.[dayHabits.day] === 'completed' ? 'habit-completed' : 'habit-uncompleted'}`}>
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