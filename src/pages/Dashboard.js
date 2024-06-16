import React, { useState } from "react";
import { signOut } from 'firebase/auth';
import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }
    const [habits, setHabits] = useState([
        {
            day: 'Monday',
            habits: ['Running', 'Cycling', 'Reading book'],
        },
        {
            day: 'Tuesday',
            habits: ['Drinking water', 'Pilates'],
        }

    ]);

    const [habitName, setHabitName] = useState('');
    const [weekDay, setWeekDay] = useState('Monday');

    const addHabit = (e) => {
        e.preventDefault();
        setHabits(prevState => {
            return prevState.map(obj => {
                if (obj.day === weekDay) {
                    return {
                        ...obj,
                        habits: [...obj.habits, habitName]
                    }
                }
                return obj;
            });
        });
        setHabitName('');
        // setWeekDay('');

    };

    return (
        <div className="App">
            <h2>Habits</h2>
            <form>
                <div className="tw-flex tw-flex-col tw-w-full tw-max-w-sm tw-items-start tw-gap-1.5">
                    <Label htmlFor="habitname">Habit name</Label>
                    <Input type="text" id="habitname" placeholder="type your habit" value={habitName} onChange={e => setHabitName(e.target.value)}/>
                </div>
                <button onClick={addHabit}>Add item</button>
            </form>
            <div>
                {habits.map(habit => <ul><h2>{habit.day}</h2><p>{habit.habits}</p></ul>)}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;