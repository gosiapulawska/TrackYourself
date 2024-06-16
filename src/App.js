import './styles/App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenForAuthChanges } from './features/auth/authThunks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const App = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(listenForAuthChanges());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
