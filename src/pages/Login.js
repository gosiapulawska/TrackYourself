import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch(loginSuccess(userCredential.user));
        } catch (err) {
            dispatch(loginFailure(err.message));
        }
        navigate('/');
    };


    return (
        <>
            <header>
                <nav className='tw-font-sans tw-flex tw-flex-row tw-h-[65px] tw-px-5 tw-border-b-2 tw-border-light-gray'>
                    <button className='tw-text-[15px] sm:tw-text-[20px] tw-font-bold tw-text-black'>track yourself</button>
                </nav>
            </header>
            <div className='sm:tw-m-5 tw-font-sans tw-m-0 tw-bg-beige tw-rounded-lg sm:tw-h-[calc(100vh-108px)] tw-h-[calc(100vh-65px)]'>
                <div className='tw-px-5 sm:tw-px-0 sm:tw-w-[500px] tw-w-[100%] tw-m-auto tw-justify-center tw-flex tw-flex-col tw-items-center'>
                    <h1 className='tw-mt-[50px] tw-mb-[30px] tw-text-black tw-text-[27px] tw-font-bold'>Sign In</h1>
                    <form className='tw-w-[100%] tw-flex tw-flex-col login-form' onSubmit={handleLogin}>
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
                        <button className='tw-mb-[30px] tw-text-white tw-text-[14px] sm:tw-text-[16px] tw-font-semibold tw-bg-pink tw-px-[40px] tw-py-[10px] tw-max-w-[180px] tw-self-center tw-rounded-lg hover:tw-bg-light-pink hover:tw-text-pink' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login