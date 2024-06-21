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
        <div>
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
        </div>
    )
}

export default Login