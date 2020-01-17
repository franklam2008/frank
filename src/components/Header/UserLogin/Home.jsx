import React, { useState, useRef } from "react";
import fire from "../../../config/Fire";
import { Button } from "react-bootstrap";
import { TiHomeOutline } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
export default function Home({ authUser }) {
  const [error, setError] = useState("");

  const phoneInput = useRef();
  return (
    <section>
      <div className="loginHeader">
        <TiHomeOutline className="lockIcon" />
        <h4>Hi, {authUser.displayName ?? "Guest"}</h4>
      </div>
      <p>Email: {authUser.email}</p>
      <p>Phone: {authUser.phone}</p>
      <div className="searchBar">
        <IoIosSearch />
        <input
          type="text"
          placeholder="Search by name"
          className="searchBarInput"
          ref={phoneInput}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="dark"
          size="sm"
          type="submit"
          block
          onClick={handlePhoneInput}
        >
          Enter
        </Button>
      </div>
      <Button variant="outline-danger" type="submit" block onClick={logout}>
        Logout
      </Button>
      <span>{error}</span>
    </section>
  );
  function logout() {
    fire
      .auth()
      .signOut()
      .then(function() {
        console.log("user logout");
      })
      .catch(function(error) {
        setError(error.message);
      });
  }
  function handlePhoneInput(e) {
    console.log(e);

    const number = phoneInput.current.value;
    console.log(number);
    console.log(authUser);


    phoneInput.current.value = null;
    fire
    .database()
    .ref("users/" + authUser.uid)
    .update({
      phone: number
    });
  }
  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handlePhoneInput();
    }
  }
}
