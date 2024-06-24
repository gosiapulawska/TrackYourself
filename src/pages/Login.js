import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';
import { selectAuthError, selectAuthStatus } from '../features/auth/authSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const authError = useSelector(selectAuthError);
    const authStatus = useSelector(selectAuthStatus);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
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
                <div className='tw-px-5 sm:tw-px-0 sm:tw-w-[500px] tw-w-[100%] tw-m-auto tw-mt-[10px] tw-justify-center tw-flex tw-flex-col tw-items-center'>
                    <h1 className='tw-mb-[30px] tw-text-black tw-text-[27px] tw-font-bold'>Add new habit</h1>
                </div>
            </div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
        </>
    )
}

export default Login