import axios from 'axios';

const LOGIN_USER = 'LOGIN_USER';

//Actions

const _loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
};

//thunks

export const loginUser = (credentials) => {
    return async (dispatch) => {
        const {data} = 
    }
}

aw