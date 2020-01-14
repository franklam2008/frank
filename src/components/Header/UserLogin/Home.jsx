import React, { useState } from "react";
import fire from "../../../config/Fire";
import { Button } from "react-bootstrap";
import { TiHomeOutline } from "react-icons/ti";

export default function Home({ authUser }) {
  const [error, setError] = useState("");

  return (
    <section>
      <div className="loginHeader">
        <TiHomeOutline className="lockIcon" />
        <h4>Hi, {authUser.displayName || authUser.email}</h4>
      </div>
      <p>Email: {authUser.email}</p>

      <Button variant="dark" type="submit" block onClick={logout}>
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
}
