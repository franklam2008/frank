
import React from "react";
// import fire from "../../../config/Fire";
//Pages
import Login from "./Login";
import Home from "./Home";
//css
import { Modal, Button } from "react-bootstrap";
//Store
import { useStore } from "../Firebase/FirebaseStore.jsx";


export default function UserLightBox(props) {
  const { state ,dispatch } = useStore();
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state.login ? <Home authUser={state.authUser} dispatch={dispatch}/> : <Login />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

}
