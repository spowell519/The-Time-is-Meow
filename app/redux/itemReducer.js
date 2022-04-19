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
  return async (dispatch) => {
    const { data } = await axios.get('/api/items');
    dispatch(_getItems(items))
  }
};

// reducers
export default function itemReducer(state = [], action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items;
  }
}