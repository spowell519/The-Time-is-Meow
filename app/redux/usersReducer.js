import axios from 'axios'

const TOKEN = 'token'

const GET_USERS = 'GET_USERS';

const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

export const getUsersAdmin = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const { data } = await axios.get('/api/users/admin', {
    headers: {
      authorization: token
    }
  })
  return dispatch(_getUsers(data))
}

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users

    default:
      return state
  }
}
