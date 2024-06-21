import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { setUser } from './authSlice';

export const signupUser = createAsyncThunk('auth/signupUser', async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
});

export const listenForAuthChanges = () => (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
        }
    });
};