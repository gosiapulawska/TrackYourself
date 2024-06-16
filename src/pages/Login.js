import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
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
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login