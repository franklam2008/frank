import React, { createContext, useReducer, useContext, useEffect } from "react";
import fire from "../../config/Fire";

const noUser = {
  //dom will return error when reading authUser.email when authUser = null
  displayName: null,
  email: null
};
const defaultState = {
  counter: 0,
  login: false,
  authUser: noUser,
  db: {}
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };
  useEffect(() => {
    fire.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({ type: "ADD_USER", payload: authUser });
      } else {
        dispatch({ type: "REMOVE_USER" });
      }
    });
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;

}

export const useStore = () => useContext(UserContext);

function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "ADD_USER":
      const { uid, displayName, email } = action.payload;
      writeUserData(uid, displayName, email);
      readDatabase(uid);
      return { ...state, login: true, authUser: action.payload };
    case "REMOVE_USER":
      return { ...state, login: false, authUser: noUser };
    case "ADD_DB":
      return { ...state, db: action.payload };
    case "ADD_POKEMON":
      return { ...state, db: action.payload };
    case "MINUS1":
      return { ...state, counter: state.counter - 1 };
    case "ADD1":
      return { ...state, counter: state.counter + 1 };
    case "CHECK_STATE":
      console.log("stateNow", state);

      return { ...state };
    default:
      return state;
  }
}
function readDatabase(uid) {

  const db = fire.database();
  const dbRef = db
    .ref()
    .child("users")
    .child(uid);
  dbRef.on("value", snapshot => {
    //do sth
    console.log(snapshot.val());
  });
}
function writeUserData(userId, name, email) {
  fire
    .database()
    .ref("users/" + userId)
    .set({
      username: name,
      email: email
      // profile_picture : imageUrl
    });
}