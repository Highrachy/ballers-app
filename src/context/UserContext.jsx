import * as React from 'react';
import PropTypes from 'prop-types';
import { INITIAL_STATE } from './initialStates';

// CONTEXT
let UserContext = React.createContext();

// REDUCERS
let reducer = (state, action) => {
  if (process.env.NODE_ENV === 'development') {
    console.info('%c[USER CONTEXT STATE] state', 'color: blue', state);
    console.info('%c[USER CONTEXT ACTION] action', 'color: green', action);
  }
  switch (action.type) {
    case 'no-token':
    case 'user-logout':
      return INITIAL_STATE;
    case 'user-info':
    case 'user-login':
    case 'user-social-media-login':
    case 'user-profile-update':
      return { ...state, ...action.user, isLoggedIn: true };
    case 'user-profile-image':
      return { ...state, profileImg: action.imageURL };
    default:
      return state;
  }
};

// PROVIDER
let UserContextProvider = (props) => {
  let [userState, userDispatch] = React.useReducer(reducer, INITIAL_STATE);
  let value = { userState, userDispatch };

  window.userState = value.userState;
  window.userDispatch = value.userDispatch;

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

// CONSUMER - ONLY USEFUL IN CLASSES
let UserContextConsumer = UserContext.Consumer;

// using in a function
// let updateUser = name => () => userDispatch({ type: 'save-user', name });
// <button className="btn btn-primary" onClick={updateUser('Oladayo')}></button>;

export { UserContext, UserContextProvider, UserContextConsumer };
