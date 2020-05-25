import React, { useEffect, useState } from "react";
import fire from "../../config/Fire";
import { useStore } from "./FirebaseStore.jsx";
var db = fire.firestore();

function FirebaseFunc({ setLogin, setLoading }) {
  const { state, dispatch } = useStore();
  const [readyToUpdate, setReadyToUpdate] = useState(false);

  //Run it once
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1800);
    //firebase Auth State Changed
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, email, uid } = authUser;
        dispatch({ type: "LOGIN_USER", payload: { displayName, email, uid } });
        loadUserData(authUser); //load saved user data once
        setLogin(true);
      } else {
        dispatch({ type: "REMOVE_USER" });
        setLogin(false);
      }
    });

    //load public data once
    //doc log from firestore
    var docRef = db.collection("public");
    //radio
    docRef
      .doc("radio-morning")
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: "LOAD_RADIO", payload: doc.data()["radio"] });
        } else {
          console.log("No such document!"); // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    //corona
    docRef
      .doc("corona")
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: "LOAD_CORONA", payload: doc.data() });
        } else {
          console.log("No such document!"); // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    //Text

    docRef
      .doc("textPlaceHolder")
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: "LOAD_TEXT", payload: doc.data().text });
        } else {
          console.log("No such document!"); // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Added Movie to Firestore
  useEffect(() => {
    if (!state.login) {
      return;
    } else if (!readyToUpdate) {
      return;
    } else {
      db.collection("users")
        .doc(state.authUser.uid)
        .update(state)
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  //update dark mode
  useEffect(() => {
    colorSwitchFunc(state.darkMode);
  }, [state.darkMode]);

  return <> </>;

  // Function
  //User data once to local
  function loadUserData(authUser) {
    var docRef = db.collection("users");
    docRef
      .doc(authUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().hasOwnProperty("addedMovies")) {
            const { addedMovies } = doc.data();
            dispatch({ type: "LOAD_MOVIES", payload: addedMovies });
          }

          if (doc.data().hasOwnProperty("darkMode")) {
            const { darkMode } = doc.data();
            dispatch({ type: "DARKMODE", payload: darkMode });
          }
          setReadyToUpdate(true);
        } else {
          console.log("No such document!"); // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return;
  }
  function colorSwitchFunc(boolean) {
    let colors = [];
    if (boolean) {
      colors = {
        //dark
        darkerBlueSaved: "#0f0e16",
        darkBlueSaved: "#1f1c28",
        blueSaved: "#0d0c14",
        lightBlueSaved: "#e52e71",
        pinkSaved: "#ff8a00",
        textWhite: "#f3f4f7",
        subTextWhite: "#caccd1",
        filter: "invert(98%)",
        // 0f0e16
      };
    } else {
      colors = {
        //light
        darkerBlueSaved: "#FFFFFF",
        darkBlueSaved: "#f2f2f2",
        blueSaved: "#E5E3E1",
        lightBlueSaved: "#FF2710",
        pinkSaved: "#FF7711",
        textWhite: "#393e46",
        subTextWhite: "#303a52",
        filter: "invert(0%)",
      };
    }
    Object.entries(colors).forEach((color) =>
      document.documentElement.style.setProperty("--" + color[0], color[1])
    );
  }
}

export default FirebaseFunc;
