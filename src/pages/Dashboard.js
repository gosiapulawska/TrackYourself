import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

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
            <header>
                <nav className='tw-font-sans tw-flex tw-flex-row tw-justify-between tw-h-[65px] tw-px-5 tw-border-b-2 tw-border-light-gray'>
                    <button className='tw-text-[15px] sm:tw-text-[20px] tw-font-bold tw-text-black'>track yourself</button>
                    <button className='tw-text-pink  tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-light-pink tw-px-[20px] sm:tw-px-[40px] tw-py-[7px] tw-rounded-lg tw-my-2 hover:tw-bg-pink hover:tw-text-light-pink' onClick={handleLogout}>Log out</button>
                </nav>
            </header>
            <div className='tw-flex tw-gap-1 sm:tw-gap-5 tw-flex-col md:tw-flex-row tw-m-1 sm:tw-m-5'>
                <div className='tw-grow tw-flex tw-flex-col tw-gap-5'>
                    <div className='tw-flex tw-items-center tw-flex-col sm:tw-flex-row tw-justify-between tw-rounded-lg tw-w-full tw-bg-orange tw-px-8 tw-py-7'>
                        <div>
                            <h1 className='tw-text-center sm:tw-text-left tw-text-white tw-text-[18px] sm:tw-text-[22px] tw-font-bold'>{`Hi, ${username}!`}</h1>
                            <p className='tw-text-center sm:tw-text-left tw-text-white tw-text-[13px] sm:tw-text-[15px] tw-mb-[8px] sm:tw-mb-0'>Good luck with your plan!</p>
                        </div>
                        <button onClick={addNewHabit} className='tw-text-white tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[15px] sm:tw-px-[40px] tw-py-[10px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink' type="submit">Add New Habit</button>
                    </div>



                    <div className='tw-hidden sm:tw-block tw-grow tw-rounded-lg tw-w-full tw-bg-beige tw-px-8 tw-py-7'>
                        <h3 className='tw-pb-[15px] tw-border-b-[1px] tw-border-b-light-gray tw-text-black tw-text-[16px] tw-font-bold'>{`Week from ${format(startDate, 'MMMM d')} to ${format(endDate, 'MMMM d')}`}</h3>
                        <table className='tw-flex tw-flex-col tw-mt-[15px]'>
                            <thead>
                            <tr className='tw-flex'>
                                {daysOfWeek.map(day => (
                                    <th className='tw-w-[14.2%] tw-font-normal tw-text-[12px] tw-mb-[10px]' key={day}>{day.charAt(0)}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className='tw-flex'>
                                {weekHabits.map(dayHabits => (
                                    <td className='tw-w-[14.2%] tw-text-center tw-mx-[2px] lg:tw-mx-[8px]' key={dayHabits.day}>
                                        {dayHabits.habits.map(habit => (
                                            <div
                                                key={habit.id}
                                                className={`tw-text-[11px] tw-mb-[8px] tw-py-[5px] tw-rounded-lg ${habit.status?.[dayHabits.day] === 'completed' ? `tw-text-white ${habit.category === 'Sport' && 'tw-bg-blue'} ${habit.category === 'Diet' && 'tw-bg-red'} ${habit.category === 'Relax' && 'tw-bg-green'}` : 'tw-text-black tw-bg-light-gray'}`}
                                            >
                                                {window.screen.width > 400 ? habit.name : habit.name.charAt(0)}
                                            </div>
                                        ))}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='tw-px-5 tw-py-7 tw-rounded-lg md:tw-w-[300px] tw-shrink-0 tw-bg-purple'>
                    <h2 className='tw-text-white tw-text-[18px] tw-font-bold'>{today}, {format(new Date(), 'MMMM d')}</h2>
                    <p className='tw-mb-8 tw-text-white tw-text-[15px]'>Your goals for today!</p>
                    <ul>
                        {habits.filter(habit => habit.days.includes(today)).map(habit => (
                            <li
                                key={habit.id}
                                className={`tw-py-4 tw-px-5 tw-border-s-[8px] tw-mb-2 tw-rounded-lg ${habit.category === 'Sport' && 'tw-border-s-blue'} ${habit.category === 'Diet' && 'tw-border-s-red'} ${habit.category === 'Relax' && 'tw-border-s-green'} ${habit.status?.[today] === 'completed' ? 'tw-bg-beige' : 'tw-bg-ghost'}`}
                            >
                                <p className={`tw-text-[13px] tw-font-bold ${habit.status?.[today] === 'completed' ? 'tw-text-black' : 'tw-text-white tw-mb-3'}`}>{habit.name}</p>
                                <button className={`tw-mb-[5px] sm:tw-mb-0 hover:tw-border-white hover:tw-bg-white hover:tw-text-purple tw-mr-2 tw-rounded-lg tw-border-[1px] tw-border-white tw-px-3 tw-py-2 tw-text-[11px] tw-font-bold tw-text-white ${habit.status?.[today] === 'completed' ? 'tw-hidden' : ''}`} onClick={() => handleCompleteClick(habit.id, today)}>Mark as completed</button>
                                <button className={`hover:tw-border-white hover:tw-bg-white hover:tw-text-purple tw-rounded-lg tw-border-[1px] tw-border-white tw-px-3 tw-py-2 tw-text-[11px] tw-font-bold tw-text-white ${habit.status?.[today] === 'completed' ? 'tw-hidden' : ''}`} onClick={() => handleDeleteClick(habit.id, today)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
);
};

export default Dashboard;