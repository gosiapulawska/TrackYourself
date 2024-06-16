import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Protected from './components/Protected';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} >
                    <Route path="signup" element={<Signup/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="/" element={<Protected/>} >
                        <Route path="/" index element={<Dashboard/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>
);
