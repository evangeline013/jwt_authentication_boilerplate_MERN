import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:3090/signup', formProps);
        dispatch({ type: AUTH_USER, payload: res.data.token });
        callback();
    } catch(err) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};