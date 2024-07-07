import React, { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Dashboard/Header';
import {logout} from "../features/auth/authSlice";
import Form from "../components/AddHabit/Form";
import AddingHabitForm from "../components/AddHabit/Form";

const AddHabit = () => {
    const [habits, setHabits] = useState([]);
    const [habit, setHabit] = useState({ name: '', category: 'Sport', days: [] });
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDayChange = (day) => {
        setHabit(prevHabit => ({
            ...prevHabit,
            days: prevHabit.days.includes(day) ?
                prevHabit.days.filter(d => d !== day) :
                [...prevHabit.days, day]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            if (user) {
                const status = {};
                habit.days.forEach(day => {
                    status[day] = 'uncompleted';
                });

                addDoc(collection(db, 'habits'), {
                        uid: user.uid,
                        status,
                        ...habit
                    })
                    .then(docRef => {
                        setHabits([...habits, {...habit, id: docRef.id}]);
                        setHabit({name: '', category: 'Sport', days: []});
                        navigate('/');
                    })
                    .catch(error => {
                        setErrors(error.message);
                    });
            }
    };


    const handleBack = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Header handleLogout={handleLogout} />
            <div className='sm:tw-m-5 tw-font-sans tw-m-0 tw-bg-beige tw-rounded-lg sm:tw-h-[calc(100vh-108px)] tw-h-[calc(100vh-65px)]'>
                <button className='tw-text-pink tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-pt-6 sm:tw-pl-10 tw-pl-5' onClick={handleBack}>Back</button>
                <div className='tw-px-5 sm:tw-px-0 sm:tw-w-[500px] tw-w-[100%] tw-m-auto tw-mt-[10px] tw-justify-center tw-flex tw-flex-col tw-items-center'>
                    <h1 className='tw-mb-[30px] tw-text-black tw-text-[20px] sm:tw-text-[27px] tw-font-bold'>Add new habit</h1>
                    <AddingHabitForm habit={habit} setHabit={setHabit} handleDayChange={handleDayChange} handleSubmit={handleSubmit}/>
                </div>
            </div>
        </>
    );
};

export default AddHabit;