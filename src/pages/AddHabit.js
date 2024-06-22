import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../features/habits/habitsThunks";
import { useNavigate } from 'react-router-dom';

const AddHabit = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Sport");
    const [days, setDays] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDayChange = (e) => {
        const day = e.target.value;
        setDays(prevDays => prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const habit = { name, category, days };
        dispatch(addHabit(habit));
        setName("");
        setCategory("Sport");
        setDays([]);
        navigate('/');
    };
    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <>
        <button onClick={handleBack}>Back</button>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Habit Name" required />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Sport">Sport</option>
                <option value="Diet">Diet</option>
                <option value="Relax">Relax</option>
            </select>
            <div>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <label key={day}>
                        <input
                            type="checkbox"
                            value={day}
                            checked={days.includes(day)}
                            onChange={handleDayChange}
                        />
                        {day}
                    </label>
                ))}
            </div>
            <button type="submit">Add Habit</button>
        </form>
        </>
    );
};

export default AddHabit;