import React from 'react';
import { format } from 'date-fns';

const WeekOverview = ({ startDate, endDate, daysOfWeek, weekHabits }) => (
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
);

export default WeekOverview;