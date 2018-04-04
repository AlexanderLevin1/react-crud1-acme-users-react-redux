// REDUX STORE!!! 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const usersReducer = (state=[], action)=> {
  switch(action.type){
    case 'SET_USERS':
      state = action.users;
      break;
    case 'CREATE_USER':
      state = [...state, action.user];
      break;
    case 'DESTROY_USER':
      state = state.filter( user=> user.id !== action.user.id); 
      break;
    case 'UPDATE_USER':
      state = state.map(user=> user.id === action.user.id ? action.user : user); 
      break;
  }
  return state;
};

const productsReducer = (state=[], action)=> {
  return state;
};

const reducer = combineReducers({
  users: usersReducer,
  products: productsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const deleteUser = (id, history)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${id}`) 
    .then( result => result.data)
    .then( () => dispatch({
      type: 'DESTROY_USER',
      user: { id  }
    }))
    .then( ()=> history.push('/'));
  }
};

const saveUser = (user, history)=> {
  const { id } = user;
  const method = id ? 'put' : 'post';
  const action = id ? 'UPDATE_USER' : 'CREATE_USER';
  const url = `/api/users/${ id ? id : ''}`;
  return (dispatch)=> {
    return axios[method](url, user)
    .then( result => result.data)
    .then( user => dispatch({
      type: action,
      user
    }))
    .then( ()=> history.push('/'));
  }
}

export default store;
export { deleteUser, saveUser };