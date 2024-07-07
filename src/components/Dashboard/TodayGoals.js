import React from 'react';
import { format } from 'date-fns';

const TodayGoals = ({ today, habits, handleCompleteClick, handleDeleteClick }) => (
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
);

export default TodayGoals;