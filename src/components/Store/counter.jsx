// counter.js

import React from "react";
import { useStore } from "../Firebase/FirebaseStore.jsx";
// import { useStore } from './Store-provider.jsx';

export default function Counter() {
  const { state, dispatch } = useStore();

  return (
    <section>
      <div className="mainTitle">Counter</div>
      <div>{state.counter}</div>
      <p>{state.authUser.displayName}</p>
      <p>{state.authUser.email}</p>

      <button onClick={() => dispatch({ type: "ADD1" })}>Add</button>
      <button onClick={() => dispatch({ type: "MINUS1" })}>
        Subtract
      </button>
      <button onClick={() => dispatch({ type: "CHECK_STATE" })}>
        Test Store
      </button>
    </section>
  );
}
