import React from 'react';

const Header = ({ handleLogout }) => (
    <header>
        <nav className='tw-font-sans tw-flex tw-flex-row tw-justify-between tw-h-[65px] tw-px-5 tw-border-b-2 tw-border-light-gray'>
            <button className='tw-text-[15px] sm:tw-text-[20px] tw-font-bold tw-text-black'>track yourself</button>
            <button className='tw-text-pink  tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-light-pink tw-px-[20px] sm:tw-px-[40px] tw-py-[7px] tw-rounded-lg tw-my-2 hover:tw-bg-pink hover:tw-text-light-pink' onClick={handleLogout}>Log out</button>
        </nav>
    </header>
);

export default Header;