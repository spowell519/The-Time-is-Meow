import axios from 'axios';

const GET_ITEMS = 'GET_ITEMS';

// actions

export const _getItems = (items) => {
  return {
    type: GET_ITEMS,
    items
  }
};

// thunks

export const getItems = (category) => {
  // later on filter by category
  console.log('We ar in the thunk');
  return async (dispatch) => {
    const { data } = await axios.get('/api/products');
    console.log('this is data', data);
    dispatch(_getItems(data))
  }
};

// reducers
export default function itemReducer(state = [], action) {
  console.log('this is action', action);
  switch (action.type) {
    case GET_ITEMS:
      return action.items;
    default: return state;
  }
}