import React from 'react';

const AddingHabitForm = ({ habit, setHabit, handleDayChange, handleSubmit }) => (
    <form className='tw-w-[100%] tw-flex tw-flex-col' onSubmit={handleSubmit}>
        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='habitname'>Habit name</label>
        <input
            className='tw-text-[16px] tw-pb-[5px] tw-bg-beige tw-mb-[20px] tw-border-b-[1px] tw-border-gray placeholder:tw-text-gray'
            type="text" id='habitname' value={habit.name} onChange={e => setHabit({...habit, name: e.target.value})}
            placeholder="Habit Name" required/>
        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='habitcategory'>Category</label>
        <select
            className='tw-rounded-lg tw-px-[10px] tw-py-[8px] tw-text-[16px] tw-mb-[20px] tw-bg-beige tw-border-gray tw-border-[1px]'
            id='habitcategory' value={habit.category} onChange={e => setHabit({...habit, category: e.target.value})}>
            <option value="Sport">Sport</option>
            <option value="Diet">Diet</option>
            <option value="Relax">Relax</option>
        </select>
        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]'>Week days</label>
        <div className='tw-mb-[25px] tw-flex tw-flex-wrap'>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <label key={day}
                       className='has-[:checked]:tw-bg-lila has-[:checked]:tw-border-0 has-[:checked]:tw-font-semibold tw-text-[12px] tw-items-center tw-justify-center tw-flex tw-w-[34px] tw-h-[34px] tw-rounded-[50px] tw-border-[1px] tw-border-gray tw-bg-white tw-cursor-pointer tw-mr-[10px] tw-mb-[10px]'>
                    <input className='peer tw-absolute tw-left-[-99999%]' type="checkbox"
                           checked={habit.days.includes(day)} onChange={() => handleDayChange(day)}/>
                    {day.charAt(0)}
                </label>
            ))}
        </div>
        <button
            className='tw-text-white tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[40px] tw-py-[10px] tw-max-w-[180px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink'
            type="submit">Add Habit
        </button>
    </form>
)

export default AddingHabitForm;