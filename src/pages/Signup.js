import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authThunks';
import { selectAuthError, selectAuthStatus } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const authStatus = useSelector(selectAuthStatus);
    const authError = useSelector(selectAuthError);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser({ email, password }));
        navigate('/');
    }

    return (
        <>
            <header>
                <nav className='tw-font-sans tw-flex tw-flex-row tw-h-[65px] tw-px-5 tw-border-b-2 tw-border-light-gray'>
                    <button className='tw-text-[20px] tw-font-bold tw-text-black'>track yourself</button>
                </nav>
            </header>
            <div className='sm:tw-m-5 tw-font-sans tw-m-0 tw-bg-beige tw-rounded-lg sm:tw-h-[calc(100vh-108px)] tw-h-[calc(100vh-65px)]'>
                <div className='tw-px-5 sm:tw-px-0 sm:tw-w-[500px] tw-w-[100%] tw-m-auto tw-justify-center tw-flex tw-flex-col tw-items-center'>
                    <h1 className='tw-mt-[50px] tw-mb-[30px] tw-text-black tw-text-[27px] tw-font-bold'>Sign Up</h1>
                    <form className='tw-w-[100%] tw-flex tw-flex-col login-form' onSubmit={handleSubmit}>
                        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='email'>Email</label>
                        <input className='tw-text-[16px] tw-pb-[5px] tw-bg-beige tw-mb-[20px] tw-border-b-[1px] tw-border-gray placeholder:tw-text-gray'
                               type="email"
                               id='email'
                               placeholder="Your Email"
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className='tw-text-gray tw-text-[13px] tw-mb-[12px]' htmlFor='password'>Password</label>
                        <input className='tw-mb-[30px] tw-text-[16px] tw-pb-[5px] tw-bg-beige tw-border-b-[1px] tw-border-gray placeholder:tw-text-gray'
                               type="password"
                               placeholder="Your Password"
                               id='password'
                               required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='tw-mb-[30px] tw-text-white tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[40px] tw-py-[10px] tw-max-w-[180px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink' type="submit">Sign Up</button>
                        <p className='tw-self-center tw-text-gary tw-text-[12px]'>Already have an account? <Link to="/login" className='tw-text-pink tw-text-[12px] tw-font-semibold'>Log In</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;