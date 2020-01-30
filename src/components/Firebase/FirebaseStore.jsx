import React, { createContext, useReducer, useContext, useEffect } from "react";
import fire from "../../config/Fire";

const defaultState = {
  counter: 0,
  login: false,
  authUser: [],
  db: [],
  data: [],
  addedMovies: []
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  useEffect(() => {
    fire.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({ type: "ADD_USER", payload: authUser });
        // const db = fire.database();
        // const dbRef = db
        //   .ref()
        //   .child("users")
        //   .child(authUser.uid);
        // dbRef.on("value", snapshot => {
        //   //do sth
        //   const data = snapshot.val();
        //   dispatch({ type: "ADD_DB", payload: data });
        //   console.log("data", data);
        // });
      } else {
        dispatch({ type: "REMOVE_USER" });
      }
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useStore = () => useContext(UserContext);

function reducer(state = defaultState, action = {}) {
  const { uid, displayName, email } = action.payload;

  switch (action.type) {
    case "ADD_USER":
      newUserData(uid, displayName, email);
      return { ...state, login: true, authUser: action.payload };
    case "LOGIN_USER":
      return { ...state, login: true, authUser: action.payload };
    case "REMOVE_USER":
      return { ...state, login: false, authUser: [] };
    case "ADD_DB":
      return { ...state, db: action.payload };
    case "ADD_POKEMON":
      return { ...state, db: action.payload };
    //movie
    case "ADD_MOVIE":
      return { ...state, addedMovies: [...state.addedMovies, action.payload] };
    //counter
    case "MINUS1":
      return { ...state, counter: state.counter - 1 };
    case "ADD1":
      return { ...state, counter: state.counter + 1 };
    //log
    case "CHECK_STATE":
      console.log("stateNow", state);
      return { ...state };
    default:
      return state;
  }
}
function newUserData(userId, name, email) {
  fire
    .database()
    .ref("users/" + userId)
    .update({
      username: name,
      email: email,
      test: "123"
    });
}
