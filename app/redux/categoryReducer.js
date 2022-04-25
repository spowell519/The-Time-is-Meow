import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';

const _getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
};
export const _addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category
  }
};
export const getCategories = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/products/categories')
    dispatch(_getCategories(data))
  }
};

export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;

    case ADD_CATEGORY:
      return [...state, action.category]

    default:
      return state;
  }
}