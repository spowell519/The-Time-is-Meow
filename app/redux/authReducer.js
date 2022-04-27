import axios from 'axios';

import { fetchLocalCart } from './cartReducer';

const TOKEN = 'token'
const USER = 'user'

const SET_AUTH = 'SET_AUTH';

//Actions

const setAuth = auth => {
    return {
        type: SET_AUTH,
        auth
    }
}

//thunks

export const me = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        const { data } = await axios.get('/api/users/auth/me', {
            headers: {
                authorization: token
            }
        })
        return dispatch(setAuth(data))
    }
}

export const authenticate = (email, password, {history}) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("api/users/login", { email, password })
            window.localStorage.setItem(TOKEN, res.data.token)
            dispatch(me())
            // move any localStorage cart to user's cart
            await dispatch(fetchLocalCart())
            // history.push('/')
        } catch (err) {
            console.log(err)
        }
    }
}
export const logout = ({history}) => {
    window.localStorage.removeItem(TOKEN)
    // history.push('/')
    return {
        type: SET_AUTH,
        auth: {}
    }
}

//reducer

export default function (state = {}, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
              firstName: action.auth.firstName,
              email: action.auth.email,
              isAdmin: action.auth.isAdmin,
              id: action.auth.id,
            }
        default:
            return state
    }
}
