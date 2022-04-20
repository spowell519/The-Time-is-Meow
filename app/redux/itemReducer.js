import axios from 'axios';

const GET_ITEMS = 'GET_ITEMS';

// actions

const _getItems = (items) => {
  return {
    type: GET_ITEMS,
    items
  }
};

// thunks

export const getItems = (category) => {
  // later on filter by category
  return async (dispatch) => {
    const { data } = await axios.get('/api/products');
    dispatch(_getItems(data))
  }
};

// reducers
export default function itemReducer(state = [], action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items;
    default:
      return state;
  }
}
