import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import Header from '../components/Dashboard/Header';
import Greeting from '../components/Dashboard/Greeting';
import WeekOverview from "../components/Dashboard/WeekOverview";
import TodayGoals from "../components/Dashboard/TodayGoals";

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const user = useSelector(state => state.auth.user);
    const username = user.email.substring(0, user.email.indexOf('@'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const today = format(new Date(), 'EEEE');
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    useEffect(() => {
        const fetchHabits = () => {
            const habitsCol = collection(db, 'habits');
            const q = query(habitsCol, where('uid', '==', user.uid));
            getDocs(q)
                .then(snapshot => {
                    const habitsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setHabits(habitsList);
                })
                .catch(error => {
                    console.error('Error fetching habits:', error);
                });
        };
        fetchHabits();
    }, [user.uid]);

    const handleCompleteClick = (habitId, day) => {
        const habitRef = doc(db, 'habits', habitId);
        getDoc(habitRef)
            .then(habitSnapshot => {
                if (habitSnapshot.exists()) {
                    const habitData = habitSnapshot.data();
                    const updatedStatus = { ...habitData.status, [day]: 'completed' };
                    return updateDoc(habitRef, { status: updatedStatus }).then(() => {
                        setHabits(habits.map(habit => {
                            if (habit.id === habitId) {
                                habit.status = updatedStatus;
                            }
                            return habit;
                        }));
                    });
                }
            })
            .catch(error => {
                console.error('Error updating habit:', error);
            });
    };


    const handleDeleteClick = (habitId, day) => {
        const habitRef = doc(db, 'habits', habitId);
        getDoc(habitRef)
            .then(habitSnapshot => {
                if (habitSnapshot.exists()) {
                    const habitData = habitSnapshot.data();
                    const updatedDays = habitData.days.filter(d => d !== day);
                    if (updatedDays.length > 0) {
                        return updateDoc(habitRef, { days: updatedDays }).then(() => {
                            setHabits(habits.map(habit => {
                                if (habit.id === habitId) {
                                    habit.days = updatedDays;
                                }
                                return habit;
                            }));
                        });
                    } else {
                        return deleteDoc(habitRef).then(() => {
                            setHabits(habits.filter(habit => habit.id !== habitId));
                        });
                    }
                }
            })
            .catch(error => {
                console.error('Error deleting habit:', error);
            });
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const weekHabits = daysOfWeek.map(day => ({
        day,
        habits: habits.filter(habit => habit.days.includes(day)),
    }));

    const addNewHabit = () => {
        navigate('/addhabit');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Header handleLogout={handleLogout} />
            <div className='tw-flex tw-gap-1 sm:tw-gap-5 tw-flex-col md:tw-flex-row tw-m-1 sm:tw-m-5'>
                <div className='tw-grow tw-flex tw-flex-col tw-gap-5'>
                    <Greeting username={username} addNewHabit={addNewHabit} />
                    <WeekOverview startDate={startDate} endDate={endDate} daysOfWeek={daysOfWeek} weekHabits={weekHabits} />
                </div>
                <TodayGoals today={today} habits={habits} handleCompleteClick={handleCompleteClick} handleDeleteClick={handleDeleteClick} />
            </div>
        </>
);
};

export default Dashboard;