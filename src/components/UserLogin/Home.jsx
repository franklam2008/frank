import React, { useState } from "react";
import fire from "../../config/Fire";
import { Button } from "react-bootstrap";
import { TiHomeOutline } from "react-icons/ti";

export default function Home({ authUser ,dispatch}) {
  const [error, setError] = useState("");

  return (
    <section>
      <div className="loginHeader">
        <TiHomeOutline className="lockIcon" />
        <h4>Hi, {authUser.displayName ?? "Guest"}</h4>
      </div>
      <p>Email: {authUser.email}</p>

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
        dispatch({ type: "CHECK_STATE" });
console.log(authUser);

      })
      .catch(function(error) {
        setError(error.message);
      });
  }
}
