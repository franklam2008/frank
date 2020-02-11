import React from "react";
//Firebase
import { useStore } from "../Firebase/FirebaseStore.jsx";
//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";
export default function About() {
  const { state, dispatch } = useStore();
  return (
    <section className="aboutCon">
      <div className="mainTitle">About</div>
      <p>This is a ReactJS Application with Authentication from Firebase.</p>
      <p>Feel free to visit my personal Website.</p>
      <a
        href="https://www.ifranklam.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>ifranklam.com </p>
      </a>
      <a
        href="https://quirky-shirley-a7ad09.netlify.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>quirky-shirley-a7ad09</p>
      </a>
      <p className="madeWith">
        Made with <FaHeart className="" /> in Orlando, Florida
      </p>

      <h4 className="text-center"> Counter/test</h4>
      <div>{state.counter}</div>
      <button onClick={() => dispatch({ type: "ADD1" })}>Add</button>
      <button onClick={() => dispatch({ type: "MINUS1" })}>Subtract</button>
      <button onClick={() => dispatch({ type: "CHECK_STATE" })}>
        log state
      </button>
      <p>{state.data}</p>
    </section>
  );
}
