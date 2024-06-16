import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ email, password }));
        navigate('/');
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
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
                <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Signup;