import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const shelf = (state = [], action) => {
    // console.log(action.payload, "action.payload in shelf reducer")
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    default:
      return state;
  }
};


// make one object that has keys shelf, registrationMessage
// these will be on the redux state at:
// state.errors.shelf and state.errors.registrationMessage
export default shelf;
