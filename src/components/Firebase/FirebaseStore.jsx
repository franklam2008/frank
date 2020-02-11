import React, { createContext, useReducer, useContext } from "react";

//state
const defaultState = {
  counter: 0,
  login: false,
  authUser: [],
  darkMode: null,
 
  addedMovies: [],
  radio: [],
  corona: []
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useStore = () => useContext(UserContext);

//reducer - function to pass data to State
function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, login: true, authUser: action.payload };
    case "REMOVE_USER":
      return { ...state, login: false, authUser: [] };
    case "ADD_DATA":
      return { ...state, data: action.payload };
    case "ADD_POKEMON":
      return { ...state, db: action.payload };
    //movies
    case "ADD_MOVIE":
      return { ...state, addedMovies: [action.payload, ...state.addedMovies] };
    case "REMOVE_MOVIE":
      return {
        ...state,
        addedMovies: [
          ...state.addedMovies.filter(movie => movie.id !== action.payload)
        ]
      };
    case "LOAD_MOVIES":
      return { ...state, addedMovies: action.payload };
    //radio
    case "LOAD_RADIO":
      return { ...state, radio: action.payload };
    //corona
    case "LOAD_CORONA":
      return { ...state, corona: action.payload }; //corona
    case "DARKMODE":
      return { ...state, darkMode: action.payload };
    //YouTubeChannels
    case "LOAD_YOUTUBECHANNELS":
      return { ...state, youTubeChannels: action.payload };
    //counter
    case "MINUS1":
      return { ...state, counter: state.counter - 1 };
    case "ADD1":
      return { ...state, counter: state.counter + 1 };
    //log

    case "CHECK_STATE":
      console.log("stateNow", state);
      return { ...state };

    //default
    default:
      return state;
  }
}
