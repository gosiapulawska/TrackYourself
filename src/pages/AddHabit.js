import React, { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, getDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const AddHabit = () => {
    const [habits, setHabits] = useState([]);
    const [habit, setHabit] = useState({ name: '', category: 'Sport', days: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();


    const handleDayChange = (day) => {
        setHabit(prevHabit => ({
            ...prevHabit,
            days: prevHabit.days.includes(day) ?
                prevHabit.days.filter(d => d !== day) :
                [...prevHabit.days, day]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            const status = {};
            habit.days.forEach(day => {
                status[day] = 'uncompleted';
            });
            try {
                const docRef = await addDoc(collection(db, 'habits'), { uid: user.uid,
                    status,
                    ...habit });
                setHabits([...habits, { ...habit, id: docRef.id }]);
                setHabit({ name: '', category: 'Sport', days: [] });
                navigate('/');
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };


    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <>
            <header>
                <nav className='tw-font-sans tw-flex tw-flex-row tw-justify-between tw-h-[65px] tw-px-5 tw-border-b-2 tw-border-light-gray'>
                    <button className='tw-text-[20px] tw-font-bold tw-text-black'>track yourself</button>
                    <button className='tw-text-pink tw-text-[16px] tw-font-semibold tw-bg-light-pink tw-px-[40px] tw-py-[7px] tw-rounded-lg tw-my-2 hover:tw-bg-pink hover:tw-text-light-pink'>Log out</button>
                </nav>
            </header>
            <div className='sm:tw-m-5 tw-font-sans tw-m-0 tw-bg-beige tw-rounded-lg sm:tw-h-[calc(100vh-108px)] tw-h-[calc(100vh-65px)]'>
                <button className='tw-text-pink tw-text-[16px] tw-font-semibold tw-pt-6 sm:tw-pl-10 tw-pl-5' onClick={handleBack}>Back</button>
                <div className='tw-px-5 sm:tw-px-0 sm:tw-w-[500px] tw-w-[100%] tw-m-auto tw-mt-[10px] tw-justify-center tw-flex tw-flex-col tw-items-center'>
                    <h1 className='tw-mb-[30px] tw-text-black tw-text-[27px] tw-font-bold'>Add new habit</h1>
                    <form className='tw-w-[100%] tw-flex tw-flex-col' onSubmit={handleSubmit}>
                        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='habitname'>Habit name</label>
                        <input className='tw-text-[16px] tw-pb-[5px] tw-bg-beige tw-mb-[20px] tw-border-b-[1px] tw-border-gray placeholder:tw-text-gray' type="text" id='habitname' value={habit.name} onChange={e => setHabit({ ...habit, name: e.target.value })} placeholder="Habit Name" required />
                        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='habitcategory'>Category</label>
                        <select className='tw-rounded-lg tw-px-[10px] tw-py-[8px] tw-text-[16px] tw-mb-[20px] tw-bg-beige tw-border-gray tw-border-[1px]' id='habitcategory' value={habit.category} onChange={e => setHabit({ ...habit, category: e.target.value })}>
                            <option value="Sport">Sport</option>
                            <option value="Diet">Diet</option>
                            <option value="Relax">Relax</option>
                        </select>
                        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]'>Week days</label>
                        <div className='tw-mb-[35px] tw-flex'>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                <label key={day} className='tw-text-[12px] tw-items-center tw-justify-center tw-flex tw-w-[34px] tw-h-[34px] tw-rounded-[50px] tw-border-[1px] tw-border-gray tw-bg-white tw-cursor-pointer tw-mr-[10px]'>
                                    <input type="checkbox" checked={habit.days.includes(day)} onChange={() => handleDayChange(day)} />
                                    {day}
                                </label>
                            ))}
                        </div>
                        <button className='tw-text-white tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[40px] tw-py-[10px] tw-max-w-[180px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink' type="submit">Add Habit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddHabit;