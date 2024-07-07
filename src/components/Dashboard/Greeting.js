import React from 'react';

const Greeting = ({ username, addNewHabit }) => (
    <div className='tw-flex tw-items-center tw-flex-col sm:tw-flex-row tw-justify-between tw-rounded-lg tw-w-full tw-bg-orange tw-px-8 tw-py-7'>
        <div>
            <h1 className='tw-text-center sm:tw-text-left tw-text-white tw-text-[18px] sm:tw-text-[22px] tw-font-bold'>{`Hi, ${username}!`}</h1>
            <p className='tw-text-center sm:tw-text-left tw-text-white tw-text-[13px] sm:tw-text-[15px] tw-mb-[8px] sm:tw-mb-0'>Good luck with your plan!</p>
        </div>
        <button onClick={addNewHabit} className='tw-text-white tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[15px] sm:tw-px-[40px] tw-py-[10px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink' type="submit">Add New Habit</button>
    </div>
);

export default Greeting;