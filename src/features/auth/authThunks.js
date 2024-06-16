import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setUser, setLoading, setError } from './authSlice';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch(setUser(userCredential.user));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ email, password }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(setUser(userCredential.user));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        dispatch(setLoading(true));
        await signOut(auth);
        dispatch(setUser(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
});

export const listenForAuthChanges = createAsyncThunk(
    'auth/listenForAuthChanges',
    async (_, { dispatch }) => {
        onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user || null));
        });
    }
);