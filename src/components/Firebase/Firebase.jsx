import React, { useEffect, useState } from "react";
import fire from "../../config/Fire";
import { useStore } from "./FirebaseStore.jsx";
var db = fire.firestore();

function FirebaseFunc({ setLogin, login, setLoading }) {
  const { state, dispatch } = useStore();
  const [readyToUpdate, setReadyToUpdate] = useState(false);

  //Run it once
  useEffect(() => {
    //firebase Auth State Changed
    fire.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        const { displayName, email, uid } = authUser;
        dispatch({ type: "LOGIN_USER", payload: { displayName, email, uid } });
        loadUserData(authUser); //load saved user data once
        setLogin(true);
        setLoading(false);
      } else {
        dispatch({ type: "REMOVE_USER" });
        setLogin(false);
      }
    });
    //load public data once
    //doc log from firestore
    var tempArr = [];
    var docRef = db.collection("public");
    docRef
      .doc("radio-morning")
      .get()
      .then(doc => {
        if (doc.exists) {
          const obj = doc.data();
          for (var i in obj) {
            tempArr.unshift(obj[i]);
          }
        } else {
          console.log("No such document!"); // doc.data() will be undefined in this case
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
    dispatch({ type: "LOAD_RADIO", payload: tempArr });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Added Movie to Firestore
  useEffect(() => {
    if (!state.login) {
      return;
    } else if (!readyToUpdate) {
      return;
    } else {
      console.log("State Updated to Firestore");
      db.collection("users")
        .doc(state.authUser.uid)
        .update(state)
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  //Public Data to Firestore
  useEffect(() => {
    if (state.radio === undefined) {
      return;
    } else if (state.radio === []) {
      return;
    } else if (state.radio.length > 1) {
      console.log("updated public Data");
      fire
        .database()
        .ref("data")
        .update({
          radio: state.radio,
          lastUpdates: "updateradio",
          data: state.data
        });
    }
  }, [state.radio, state.data]);
  return <> </>;

  //User data once to local
  function loadUserData(authUser) {
    var docRef = db.collection("users");
    docRef
      .doc(authUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          if (doc.data().hasOwnProperty("addedMovies")) {
            const { addedMovies } = doc.data();
            dispatch({ type: "LOAD_MOVIES", payload: addedMovies });
          }
          if (doc.data().hasOwnProperty("youTubeChannels")) {
            const { youTubeChannels } = doc.data();
            dispatch({
              type: "LOAD_YOUTUBECHANNELS",
              payload: youTubeChannels
            });
          }
          setReadyToUpdate(true);
        } else {
          console.log("No such document!"); // doc.data() will be undefined in this case
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
    return;
  }
}

export default FirebaseFunc;
//collection log
// docRef
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       tempArr.push(doc.data());
//       console.log(doc.id, " => ", doc.data());
//     });
//   })
//   .catch(error => {
//     console.log("Error getting document:", error);
//   });
//Added youTubeChannels to Firestore

// useEffect(() => {
//   if (!state.login) {
//     return;
//   } else if (state.addedMovies.length > 1) {
//     return;
//   } else {
//     console.log("updatedYouTubeChannels");
//     db.collection("users")
//       .doc(state.authUser.uid)
//       .update({
//         youTubeChannels: state.youTubeChannels
//       })
//       .catch(error => {
//         console.error("Error adding document: ", error);
//       });
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [state.youTubeChannels]);
