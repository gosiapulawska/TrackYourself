import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';
import Header from '../components/Login/Header';
import LoginForm from "../components/Login/Form";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //signInWithEmailAndPassword is firebase method, which runs as the users completes the form.
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(loginSuccess(userCredential.user));
                navigate('/');
            })
            .catch((err) => {
                dispatch(loginFailure(err.message));
                setError(err.message);
            });
    };

    return (
        <>
            <Header />
            <div className='sm:tw-m-5 tw-font-sans tw-m-0 tw-bg-beige tw-rounded-lg sm:tw-h-[calc(100vh-108px)] tw-h-[calc(100vh-65px)]'>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    error={error}
                />
            </div>
        </>
    )
}

export default Login