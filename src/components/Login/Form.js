import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, error }) => (
    <div className='tw-px-5 sm:tw-px-0 sm:tw-w-[500px] tw-w-[100%] tw-m-auto tw-justify-center tw-flex tw-flex-col tw-items-center'>
        <h1 className='tw-mt-[50px] tw-mb-[30px] tw-text-black tw-text-[27px] tw-font-bold'>Sign In</h1>
        <form className='tw-w-[100%] tw-flex tw-flex-col login-form' onSubmit={handleLogin}>
            <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='email'>Email</label>
            <input
                className='tw-text-[16px] tw-pb-[5px] tw-bg-beige tw-mb-[20px] tw-border-b-[1px] tw-border-gray placeholder:tw-text-gray'
                type="email"
                id='email'
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='password'>Password</label>
            <input
                className='tw-mb-[30px] tw-text-[16px] tw-pb-[5px] tw-bg-beige tw-border-b-[1px] tw-border-gray placeholder:tw-text-gray'
                type="password"
                placeholder="Your Password"
                id='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='tw-mb-[30px] tw-text-white tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[40px] tw-py-[10px] tw-max-w-[180px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink' type="submit">Login</button>
            <p>{error}</p>
        </form>
    </div>
);

export default LoginForm;