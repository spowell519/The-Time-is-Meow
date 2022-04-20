import axios from 'axios';

const TOKEN = 'token'

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

export const authenticate = (email, password, method) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("api/users/login", { email, password })
            window.localStorage.setItem(TOKEN, res.data.token)
            dispatch(me())
        } catch (err) {
            console.log(err)
        }
    }
}
export const logout = () => {
    window.localStorage.removeItem(TOKEN)
    history.push('/login')
    return {
        type: SET_AUTH,
        auth: {}
    }
}

//reducer

export default function (state = {}, action) {
    switch (action.type) {
        case SET_AUTH:
            return action.auth
        default:
            return state
    }
}
