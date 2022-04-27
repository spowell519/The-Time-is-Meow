import axios from 'axios';
import { authenticate } from './authReducer';

//action types
const GOT_USER = 'GOT_USER';
const ADDED_USER = 'ADDED_USER';
const EDITED_USER = 'EDITED_USER';

//action creators
const gotUser = (user) => ({
    type: GOT_USER,
    user
});

const addedUser = (user) => ({
    type: ADDED_USER,
    user
});

const editedUser = (user) => ({
    type: EDITED_USER,
    user
});

//thunks
export const getUser = (token) => async (dispatch) => {
    const { data } = await axios.get(`/api/users/auth/me`, {
        headers: {
            authorization: token
        }
    });
    dispatch(gotUser(data));
};

export const addUser = (user, history) => async (dispatch) => {
    const { data } = await axios.post('/api/users/', user);
    dispatch(addedUser(data));
    dispatch(authenticate(user.email, user.password, history))
};

export const editUser = (user, id) => async (dispatch) => {
    const { data } = await axios.put(`/api/users/${id}`, user);
    dispatch(editedUser(data));
};

//reducers
export default function userReducer(state = {}, action) {
    switch (action.type) {
        case GOT_USER:
            return {
                ...action.user
            }
        case ADDED_USER:
            return {
                ...action.user
            }
        case EDITED_USER:
            return {
                ...state.user,
                ...action.user
            }
        default:
            return state;

    }
}
