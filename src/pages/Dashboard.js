import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, selectAllHabits } from "../features/habits/habitsSlice";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const habits = useSelector(selectAllHabits);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchHabits());
        }
    }, [user, dispatch]);

    const today = format(new Date(), 'EEEE');
    const todayHabits = habits.filter(habit => habit.days.includes(today));

    const addNewHabit = (e) => {
        e.preventDefault();
        navigate('/addhabit');
    }

    return (
        <div>
            <button onClick={addNewHabit}>Add new Habit</button>
            <h1>Weekly Habits</h1>
            <table>
                <thead>
                <tr>
                    <th>Habit</th>
                    <th>Category</th>
                    <th>Days</th>
                </tr>
                </thead>
                <tbody>
                {habits.map(habit => (
                    <tr key={habit.id}>
                        <td>{habit.name}</td>
                        <td>{habit.category}</td>
                        <td>{habit.days.join(", ")}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h1>Today's Habits</h1>
            <table>
                <thead>
                <tr>
                    <th>Habit</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todayHabits.map(habit => (
                    <tr key={habit.id}>
                        <td>{habit.name}</td>
                        <td>{habit.category}</td>
                        <td>
                            <button>Complete</button>
                            <button>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;