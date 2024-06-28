import './styles/App.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { logout } from './features/auth/authSlice';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddHabit from "./pages/AddHabit";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const App = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    auth.onAuthStateChanged((user) => {
        if (!user) {
            dispatch(logout());
        }
    });

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/addhabit" element={user ? <AddHabit /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
